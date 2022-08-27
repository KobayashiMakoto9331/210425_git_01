import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import { required, min, email } from "vee-validate/dist/rules";

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
};

extend('min', {
  params: ['length'],
  message: '{_field_}は{length}文字以上で入力してください',
  validate(value, {length}){
    return value.length >= length
  }
})

extend('max', {
  params: ['length'],
  message: '{_field_}は{length}文字以下で入力してください',
  validate(value, {length}){
    return value.length <= length
  }
})

extend('required', {
  ...required,
  message: '{_field_}は必須項目です'
});

extend('email', {
  ...email,
  message: '{_field_}の形式で入力してください'
})

extend("required", { // ルールの名前
  ...required, // 追加する検証ルールの種類
  message: "{_field_}は必須項目です", // 表示するメッセージ
});

extend("password_confirmation", {
  params: ['target'],
  message: 'パスワードと一致しません',
  validate(value, { target }) {
    return value == target
  }
})

