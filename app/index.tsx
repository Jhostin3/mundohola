import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { z } from 'zod';

const UserSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export default function HomeScreen() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const validateEmail = () => {
    try {
      UserSchema.parse({ email });
      setMessage('Email is valid!');
    } catch (error) {
      if (error instanceof z.ZodError) {
        setMessage(error.errors[0].message);
      }
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 p-4">
      <Text className="text-2xl font-bold mb-4">Zod Example</Text>
      <TextInput
        className="w-full h-12 border border-gray-300 rounded-lg px-4 mb-4"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Button title="Validate Email" onPress={validateEmail} />
      {message ? (
        <Text
          className={`mt-4 text-lg ${message.includes('Invalid') ? 'text-red-500' : 'text-green-500'}`}>
          {message}
        </Text>
      ) : null}
    </View>
  );
}
