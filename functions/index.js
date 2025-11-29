// Firebase Functions - Secure Gemini API Backend
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { GoogleGenerativeAI } = require('@google/generative-ai');

admin.initializeApp();

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(functions.config().gemini.key);

// Call Gemini API securely from backend
exports.callGemini = functions.https.onCall(async (data, context) => {
  // Verify user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }

  const { prompt, mode, files } = data;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-preview-09-2025' });

    const systemPrompts = {
      'Policy Architect': 'You are Atlas-Prime in Policy Architect mode. Act as a pragmatic governance expert.',
      'Compliance & Risk Analyst': 'You are Atlas-Prime in Risk Analyst mode. Identify risks with brutal honesty.',
      'Ethical Auditor': 'You are Atlas-Prime in Ethical Auditor mode. Focus on transparency and oversight.',
      'Data Lineage Officer': 'You are Atlas-Prime in Data Lineage mode. Focus on data traceability.'
    };

    const contents = [{ text: prompt }];

    // Add files if provided
    if (files && files.length > 0) {
      files.forEach(file => {
        contents.push({
          inlineData: {
            mimeType: file.type,
            data: file.base64
          }
        });
      });
    }

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: contents }],
      systemInstruction: { parts: [{ text: systemPrompts[mode] || systemPrompts['Policy Architect'] }] }
    });

    const response = await result.response;
    const text = response.text();

    // Save to Firestore
    await admin.firestore().collection('users').doc(context.auth.uid)
      .collection('messages').add({
        prompt,
        response: text,
        mode,
        timestamp: admin.firestore.FieldValue.serverTimestamp()
      });

    return { response: text, success: true };

  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new functions.https.HttpsError('internal', error.message);
  }
});

// Get chat history
exports.getChatHistory = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }

  try {
    const snapshot = await admin.firestore()
      .collection('users')
      .doc(context.auth.uid)
      .collection('messages')
      .orderBy('timestamp', 'desc')
      .limit(50)
      .get();

    const messages = [];
    snapshot.forEach(doc => {
      messages.push({ id: doc.id, ...doc.data() });
    });

    return { messages, success: true };
  } catch (error) {
    throw new functions.https.HttpsError('internal', error.message);
  }
});

// Clear chat history
exports.clearChatHistory = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }

  try {
    const batch = admin.firestore().batch();
    const snapshot = await admin.firestore()
      .collection('users')
      .doc(context.auth.uid)
      .collection('messages')
      .get();

    snapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    return { success: true };
  } catch (error) {
    throw new functions.https.HttpsError('internal', error.message);
  }
});
