export interface Token {
    access_token: string,
    token_type: string,
    created_at_utc: Date,
    expires_at_utc: Date,
    username: string,
    customer_id: number,
    customer_guid: string
  }