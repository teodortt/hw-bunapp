import React, { useCallback, useMemo, useState } from "react";
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AUTHORIZATION_TOKEN, baseURL } from "../shared/useApi";

type FormState = {
  name: string;
  university: string;
  phone: string;
  email: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const ENDPOINT = `${baseURL}/contact/`;

const sanitizePhone = (input: string) => {
  const trimmed = input.trim();
  if (trimmed.startsWith("+")) {
    return "+" + trimmed.slice(1).replace(/\D/g, "");
  }
  return trimmed.replace(/\D/g, "");
};

const validate = (values: FormState): FormErrors => {
  const errors: FormErrors = {};

  // Name: required, 2-100 chars
  const name = values.name.trim();
  if (!name) {
    errors.name = "Моля, въведете име.";
  } else if (name.length < 2) {
    errors.name = "Името трябва да съдържа поне 2 символа.";
  } else if (name.length > 100) {
    errors.name = "Името е твърде дълго.";
  }

  const university = values.university.trim();
  if (!university) {
    errors.university = "Моля, въведете университет.";
  }
  // Phone: required, + and digits, 7-15 digits total
  const phone = sanitizePhone(values.phone);
  if (!phone) {
    errors.phone = "Моля, въведете телефон.";
  } else if (!/^\+?\d{7,15}$/.test(phone)) {
    errors.phone =
      "Телефонът трябва да съдържа между 7 и 15 цифри (може да започва с +).";
  }

  // Email: required and must be valid
  const email = values.email.trim();
  if (!email) {
    errors.email = "Моля, въведете email адрес.";
  } else if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!emailRegex.test(email)) {
      errors.email = "Моля, въведете валиден имейл адрес.";
    }
  }

  return errors;
};

export const Inquiry = () => {
  const insets = useSafeAreaInsets();

  const [values, setValues] = useState<FormState>({
    name: "",
    university: "",
    phone: "",
    email: "",
  });

  const [touched, setTouched] = useState<
    Partial<Record<keyof FormState, boolean>>
  >({});
  const [submitting, setSubmitting] = useState(false);

  const currentErrors = useMemo(() => validate(values), [values]);
  const isFormValid = useMemo(
    () => Object.keys(currentErrors).length === 0,
    [currentErrors]
  );

  const onBlur = useCallback((field: keyof FormState) => {
    setTouched((t) => ({ ...t, [field]: true }));
  }, []);

  const setField = useCallback((field: keyof FormState, value: string) => {
    setValues((v) => {
      let next = value;
      if (field === "phone") {
        next = next.replace(/[^\d+]/g, "");
        if (next.indexOf("+") > 0) next = next.replace(/\+/g, "");
      }
      return { ...v, [field]: next };
    });
  }, []);

  const handleSubmit = useCallback(async () => {
    const finalErrors = validate(values);
    setTouched({
      name: true,
      university: true,
      phone: true,
      email: true,
    });

    if (Object.keys(finalErrors).length > 0) {
      Alert.alert(
        "Невалидни данни",
        "Моля, поправете грешките и опитайте отново."
      );
      return;
    }

    setSubmitting(true);

    const payload = {
      name: values.name.trim(),
      university: values.university.trim(),
      phone: sanitizePhone(values.phone),
      email: values.email.trim(),
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          Authorization: `Token ${AUTHORIZATION_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(
          `Грешка: ${res.status} - ${res.statusText || errorText}`
        );
      }

      setValues({ name: "", university: "", phone: "", email: "" });
      setTouched({});
      SheetManager.hide("inquiry");
      Alert.alert("Успех", "Запитването беше изпратено успешно.");
    } catch (err: any) {
      const isAbort = err?.name === "AbortError";
      Alert.alert(
        "Грешка",
        isAbort
          ? "Заявката отне твърде дълго време. Моля, опитайте отново."
          : err.message ||
              "Възникна грешка при изпращане. Моля, опитайте отново."
      );
      console.error("Submit error:", err);
    } finally {
      setSubmitting(false);
      clearTimeout(timeoutId);
    }
  }, [values]);

  const getError = (field: keyof FormState) =>
    touched[field] ? currentErrors[field] : undefined;

  return (
    <ActionSheet
      isModal
      gestureEnabled
      indicatorStyle={{ width: 0 }}
      safeAreaInsets={insets}
      containerStyle={{ height: 400, backgroundColor: "#232533" }}
    >
      <View className="h-full bg-[#232533] px-6 justify-start">
        <Text className="text-2xl font-semibold text-center pb-8 text-white">
          Безплатна консултация
        </Text>

        {/* Name */}
        <TextInput
          className={`h-12 border rounded-xl px-4 text-base bg-gray-50 mb-1 ${
            getError("name") ? "border-red-500" : "border-gray-300"
          } text-black`}
          placeholder="Име*"
          placeholderTextColor="#999"
          value={values.name}
          onChangeText={(t) => setField("name", t)}
          onBlur={() => onBlur("name")}
          autoCapitalize="words"
          maxLength={100}
          returnKeyType="next"
          accessibilityLabel="Име"
        />
        {getError("name") ? (
          <Text className="text-red-400 text-xs mb-3">{getError("name")}</Text>
        ) : (
          <View className="mb-3" />
        )}

        {/* University */}
        <TextInput
          className={`h-12 border rounded-xl px-4 text-base bg-gray-50 mb-1 ${
            getError("university") ? "border-red-500" : "border-gray-300"
          } text-black`}
          placeholder="Университет*"
          placeholderTextColor="#999"
          value={values.university}
          onChangeText={(t) => setField("university", t)}
          onBlur={() => onBlur("university")}
          autoCapitalize="words"
          maxLength={150}
          returnKeyType="next"
          accessibilityLabel="Университет"
        />
        {getError("university") ? (
          <Text className="text-red-400 text-xs mb-3">
            {getError("university")}
          </Text>
        ) : (
          <View className="mb-3" />
        )}

        {/* Phone */}
        <TextInput
          className={`h-12 border rounded-xl px-4 text-base bg-gray-50 mb-1 ${
            getError("phone") ? "border-red-500" : "border-gray-300"
          } text-black`}
          placeholder="Телефон*"
          placeholderTextColor="#999"
          value={values.phone}
          onChangeText={(t) => setField("phone", t)}
          onBlur={() => onBlur("phone")}
          maxLength={16}
          returnKeyType="next"
          accessibilityLabel="Телефон"
        />
        {getError("phone") ? (
          <Text className="text-red-400 text-xs mb-3">{getError("phone")}</Text>
        ) : (
          <View className="mb-3" />
        )}

        {/* Email */}
        <TextInput
          className={`h-12 border rounded-xl px-4 text-base bg-gray-50 mb-1 ${
            getError("email") ? "border-red-500" : "border-gray-300"
          } text-black`}
          placeholder="Email*"
          placeholderTextColor="#999"
          autoCapitalize="none"
          value={values.email}
          onChangeText={(t) => setField("email", t)}
          onBlur={() => onBlur("email")}
          maxLength={120}
          returnKeyType="done"
          accessibilityLabel="Имейл"
        />
        {getError("email") ? (
          <Text className="text-red-400 text-xs mb-3">{getError("email")}</Text>
        ) : (
          <View className="mb-3" />
        )}

        <TouchableOpacity
          onPress={handleSubmit}
          disabled={!isFormValid || submitting}
          className={`h-12 rounded-xl justify-center items-center ${
            !isFormValid || submitting ? "bg-[#ff9f36]/60" : "bg-[#ff9f36]"
          }`}
        >
          {submitting ? (
            <View className="flex-row items-center">
              <ActivityIndicator color="#fff" />
              <Text className="text-white text-base font-semibold ml-3">
                Изпращане…
              </Text>
            </View>
          ) : (
            <Text className="text-white text-base font-semibold">Изпрати</Text>
          )}
        </TouchableOpacity>
      </View>
    </ActionSheet>
  );
};
