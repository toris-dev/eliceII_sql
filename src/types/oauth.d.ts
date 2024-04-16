export type tokenTypes = {
  access_token: string;
  token_type: 'bearer';
  refresh_token: string;
  id_token: string;
  expires_in: number;
  scope: string;
  refresh_token_expires_in: number;
};

export type UserData = {
  id: number;
  connected_at: string;
  properties: {
    nickname: string;
    profile_image: string;
    thumbnail_image: string;
  };
  kakao_account: {
    profile_nickname_needs_agreement: boolean;
    profile_image_needs_agreement: boolean;
    profile: {
      nickname: string;
      thumbnail_image_url: string;
      profile_image_url: string;
      is_default_image: boolean;
      is_default_nickname: boolean;
    };
    has_email: boolean;
    email_needs_agreement: boolean;
    is_email_valid: boolean;
    is_email_verified: boolean;
    email: string;
  };
} & {
  id: string;
  nickname: string;
  age: string; // May not be a string depending on actual data format
  gender: string;
};

export type ProviderError = {
  message: string;
  code?: string; // 특정 오류 코드가 필요한 경우 추가
};
