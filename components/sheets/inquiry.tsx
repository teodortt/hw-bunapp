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

type FormState = {
  name: string;
  phone: string;
  email: string;
  inquiry: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const ENDPOINT =
  "https://script.google.com/macros/s/AKfycbxyaAPnes5OwpLOD2z1xZNstxHP6Jg2WXJl07o6299dhqFw5AZJGItQbCPPYgvjrdGv/exec";

const sanitizePhone = (input: string) => {
  // Keep leading "+" if present, remove everything else non-digit
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

  // Phone: required, + and digits, 7-15 digits total (E.164-like)
  const phone = sanitizePhone(values.phone);
  if (!phone) {
    errors.phone = "Моля, въведете телефон.";
  } else if (!/^\+?\d{7,15}$/.test(phone)) {
    errors.phone =
      "Телефонът трябва да съдържа между 7 и 15 цифри (може да започва с +).";
  }

  // Email: optional, but if present must be valid
  const email = values.email.trim();
  if (email) {
    // Simple, pragmatic regex (not RFC-perfect)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!emailRegex.test(email)) {
      errors.email = "Моля, въведете валиден имейл адрес.";
    }
  }

  // Inquiry: optional, length limited by component
  if (values.inquiry.length > 500) {
    errors.inquiry = "Съобщението е твърде дълго (макс. 500 символа).";
  }

  return errors;
};

export const Inquiry = () => {
  const insets = useSafeAreaInsets();

  const [values, setValues] = useState<FormState>({
    name: "",
    phone: "",
    email: "",
    inquiry: "",
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

  const setField = useCallback(
    (field: keyof FormState, value: string) => {
      setValues((v) => {
        let next = value;
        if (field === "phone") {
          // Soft-sanitize while typing: keep + and digits only
          next = next.replace(/[^\d+]/g, "");
          // Prevent multiple '+' in the middle
          if (next.indexOf("+") > 0) next = next.replace(/\+/g, "");
        }
        return { ...v, [field]: next };
      });
    },
    [touched, values]
  );

  const handleSubmit = useCallback(async () => {
    const finalErrors = validate(values);
    setTouched({
      name: true,
      phone: true,
      email: touched.email || !!values.email, // touch email if it's filled
      inquiry: touched.inquiry || !!values.inquiry,
    });

    if (Object.keys(finalErrors).length > 0) {
      Alert.alert(
        "Невалидни данни",
        "Моля, поправете грешките и опитайте отново."
      );
      return;
    }

    setSubmitting(true);

    // Build payload with trimmed/sanitized values
    const payload = {
      name: values.name.trim(),
      phone: sanitizePhone(values.phone),
      email: values.email.trim() || undefined,
      inquiry: values.inquiry.trim() || undefined,
    };

    // Timeout guard
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const text = await res.text();
      if (!res.ok) {
        throw new Error(text || `HTTP ${res.status}`);
      }

      setValues({ name: "", phone: "", email: "", inquiry: "" });
      setTouched({});
      SheetManager.hide("inquiry");
      Alert.alert("Успех", "Запитването беше изпратено успешно.");
    } catch (err: any) {
      const isAbort = err?.name === "AbortError";
      Alert.alert(
        "Грешка",
        "Възникна грешка при изпращане. Моля, опитайте отново."
      );
      console.error("Submit error:", err);
    } finally {
      setSubmitting(false);
      clearTimeout(timeoutId);
    }
  }, [values, touched]);

  const getError = (field: keyof FormState) =>
    touched[field] || field === "email" || field === "inquiry"
      ? currentErrors[field]
      : undefined;

  return (
    <ActionSheet
      isModal
      gestureEnabled
      indicatorStyle={{ width: 0 }}
      safeAreaInsets={insets}
      containerStyle={{ height: 420, backgroundColor: "#232533" }}
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

        {/* Phone */}
        <TextInput
          className={`h-12 border rounded-xl px-4 text-base bg-gray-50 mb-1 ${
            getError("phone") ? "border-red-500" : "border-gray-300"
          } text-black`}
          placeholder="Телефон*"
          placeholderTextColor="#999"
          keyboardType="phone-pad"
          value={values.phone}
          onChangeText={(t) => setField("phone", t)}
          onBlur={() => onBlur("phone")}
          maxLength={16} // + 15 digits
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
          placeholder="Email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          value={values.email}
          onChangeText={(t) => setField("email", t)}
          onBlur={() => onBlur("email")}
          maxLength={120}
          returnKeyType="next"
          accessibilityLabel="Имейл"
        />
        {getError("email") ? (
          <Text className="text-red-400 text-xs mb-3">{getError("email")}</Text>
        ) : (
          <View className="mb-3" />
        )}

        {/* Inquiry */}
        <TextInput
          className={`border rounded-xl px-4 text-base bg-gray-50 mb-2 ${
            getError("inquiry") ? "border-red-500" : "border-gray-300"
          } text-black`}
          placeholder="Запитване (не е задължително)"
          placeholderTextColor="#999"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          style={{ height: 100 }}
          maxLength={500}
          value={values.inquiry}
          onChangeText={(t) => setField("inquiry", t)}
          onBlur={() => onBlur("inquiry")}
          accessibilityLabel="Запитване"
        />
        {getError("inquiry") ? (
          <Text className="text-red-400 text-xs mb-3">
            {getError("inquiry")}
          </Text>
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
