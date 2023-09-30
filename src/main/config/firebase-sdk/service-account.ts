import  { ServiceAccount } from 'firebase-admin';

export const serviceAccount: ServiceAccount = 
{
  "type": "service_account",
  "project_id": "gmsmobile-1df6b",
  "private_key_id": "8057a5e048d02c89038f7db32693cb15b9234ca6",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCdxWTHVfT2gN5S\nVAYiQOVXPb51wz1qx5rbWxr9yVL5TYDouNzdz98hVC1DMgxrQpJccqaN6VCKEoAt\nFULwzvhvNEa0JOE8JWWjZ1dg7SAXc5nZtMpq26mlTKyelm/YDll9iYbZ1mU9CRyN\ns2MgBfZzp8O6vuaZgntTxDySDfE4LhHLlsm27QDhcpJ6O0EGLmKKih882fSZSn7w\nDb6HIVbYa5o3wblKLkmTv76h8PoZURXHDCyksS7qeBcAfBZWYamD0tSJfoghRiIj\nCKXUCHk+Indijy6hlc8+5nr3zxw993BnA6uEh7s9r7hkMKLqb5bvnbxbe4QeMIbE\n4vJJUZAFAgMBAAECggEAI+fflqoOVOdhMXVj6/m++AraRKzJVnrU2GU0kFt4Ibqs\nwsoHogeD7W7d2jQStXpyGs4Q760QokuxlhEHqgxAZ/aKvMbD589PAVAsh6ePrSam\n9e/6PTV+t1rq0jDEhXRGk5Zv9TWg1rIzKGCSB6CzxQCCQAbgLkGO1bKMYmT/59vg\njoeiy6QE5ZCLqrVp6So5yBpy6158gC61zNc+11NPjfuwvPcWbGz7q044EAZ0LCaK\nJ7a74TzEbBYpSpLvWOi3Vj/6x/wAaqHNaC35LPdY1UZ9o4N+sTKYkuSjgXPmqcRN\nqZHHplcWtHsolAUMTv9IhZjpfr5Qw2RE0Q4tRvr44QKBgQDWnTei5vEFZGQtld6v\ngJ4l/FExBHblYvG2KjkJcYTMsaLzPtQA2BctkJcgZ0VVrabfcY/yDjHqNajbYA4p\n7fvdUjAipH4Lsm7RTdKYfmsfHJBpOWfESdZ+X3GYGCRZz4jghg0YN4O02TVirNdj\nRH6dyTTQNKU16zbzUrwt+OzfOQKBgQC8MgY4PwnBe0ffRDiDeMG8/NKiFY3rhFpu\nq3vE84V0y2YaC5a6HnGHAd+P5KLRDbbohoZG1+o5AMRclgHKxOj+lnfaa1A5CVjV\nhwpCxEu9tKAhlxqSwH5sSt1j+q0TG4fastGm6sqCA7XBXYTfqq+ASKCVYHWuVt03\nsvrN5+3rLQKBgQC5Hm+pMm9f6VKIB6hH1jeUKGqYT3OHNautKAp+3M5iCi+2hdE0\n0TBc+0WAi9PArcMtJbW2YwwnLBX09IwDGuaP557houWejVENdYVcSF96PJdMTFn3\ndIFyDD3dpaVlWqCEmtycsPYIfvuPm+tGEwTscWv+1ApV0ghaJllvhjI78QKBgQCP\nEYCE9fdWrX/gDZ7g48Z1A8alDbnMV9vf0mHPQkoslgxStIiriUVJG3V3kJruTnzE\nnLAr3yzilOCyeh92pOdz07PdykM8eQydl4GHbG8gEtbBcnvzIH97mBZiUUmOAxnu\neo7DVC8LVAKys4O1/a5Z2dyqcqBEHykhlODx8+V9KQKBgAc6TFRsPSNBtKDtPg/N\nL/loehvdLFVF0teQhM2FU1a2RnX44vXTO0bV/air5P9hf+VnNfw+WxmXy1+bQqYj\nHHI1ij3BjgDO1f+lCyxReYVEqMAY1Xs6zIU5R6C4CbUun7twk0aG4Kpff53kbkB5\n1F7lXOssmCYhzOKjXkD6pze7\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-4e8jc@gmsmobile-1df6b.iam.gserviceaccount.com",
  "client_id": "101898106727475221052",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-4e8jc%40gmsmobile-1df6b.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}



//  This is for old firebase authentication in 
/*
      "type": "service_account",
        "project_id": "fir-auth-9bdba",
        "private_key_id": "eb7d802c8a0d2ffe1513c01d2532e5c9e61b49cc",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCtDcczc5QrJfRW\nJ6c7EyKeqVLCGYPOaaB2x3vXlvE3qDKQD8GMcyLJfoCpwGl2uadVWPxpxzrEJlOk\nygtSCcYopzj1tKYxqH0siWBu7rNsXRJ69+pLm/Ixgt1vyCvLpJns9U6YixksibLj\nSqqtCZOCETaJ8kn76TxOYmAkM9JsNxAIl76dQU/zxXvTITJnO/vDxXGT3EHj9XLO\nkh2fljTQ6941Ne+yaeenCsgL+VZka1Rp+FuSJb+S16CeK76Qlhv0HmSCVb1gqxGQ\nyCE+vlaq3Y66glHv4mj8SRBY6+bibBWLi2ct5MW9fdQMjQ1R24aDY3N7IOpGMPJF\nQd4oFavlAgMBAAECggEAH0PJPLQxrX74rxUQa0WYgFo+g6dI7yKZtUPyjZ9tWp0W\nb30NPoLxor4qYCDNXQALKYn/Zlvyc8wp2fCPzYVLCf62NXvq97dFUCXMqJYTD+2b\nwGAocfsNbWEDgSXEtdC553vlNH2S8X86NMLBZaxAfGQAOrltoOfBN7chwACl0Ftw\n2ErQvMcY1eEI8gsIjrtn/AxH2FT/JQ0o8WxjEcHETbpnxtLqpmlpnBlsYOWCTq43\nb26dxCVJDGhmCTXHAkuU8VNeAvSbhqlGKrK3+kFU9feZvB7U9TJblVqZ/HeOr68o\nktNu+Ss8/dYMbM42UUHv6ZZJbV6YxSA1wixNlT/yAQKBgQDqf6/FmHKYJhzOHH9l\nhIIIC6gD4YPziI3mqqZBJ3D6D6KzsKMDd+ik0u0sbnBJi4+HE5BsB85SC0mBg5vl\nWPlbc3AuXb5X1eR7nNQZA0AeiZMN++gVXt0TDlVSyM6XfC/PLyAkxywDQBaG/77J\neOUTSGwex5XbvMwWSBBpbjvh5QKBgQC869BpEYY5pPW5Vqf4k4dhfwpHpXkUMI44\n71N8d94uWZjURB32sQUeBK51l9GpE9n3motCqac7l1yDUMUsIJ8kMGT5K2/0Yydj\nLoAcpLHnx4IABKXxWIi81hVwxh4pLyMj2//6wHz8CzXhUgBU4rl8TifwuiMax7/2\nbci5EF4CAQKBgQDfq+FNuUZ8x8Wr91Sw0T5yTCP7Z6zDqxmmzlj8RpGlgypu+OnU\nUhhutt4RBlpGXD8P2WJlGOD8MtXvGkil70MRrr9vCm2XPGbOXV2VahtLxW+l5ASP\n9ccq+P37k5wys/qqRUoEqpHZm9Sg+enSJGVkCi1PApJ3YNLN4fj9h27I3QKBgBkX\n9YHPOxXzDFSG5x7EccoIdtQXbaK55Fo5p8wzm8ZqTjt7pMM8tiJLmuSxur6LjXsv\nAupi4Hyw2S/0DYyT9K944iCanW9HsFajOY8UbTENNf5Mn8IT8W2rvgNRvXXY9gDw\nWuryoGdWEd0Q6ExeJScWtoVqI/mNqLjR0kSKoQIBAoGBAKb7tEy64ffTMJrEWTHd\nNqPhGjAQXraln5o+HfpNApj5w305N4CPwHWTkAp7Nv/6hFyB7MeEYFOVeQaDnLNF\nEEsbFfcoeTjMEcHbM/cfOTMUKGQr4ON5+EoJo8+/voCWWR3R0C38DZmG1RYJFMFm\nbtLylUerjstlXr6N8I8nUydE\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-527ck@fir-auth-9bdba.iam.gserviceaccount.com",
        "client_id": "100535438910240380089",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-527ck%40fir-auth-9bdba.iam.gserviceaccount.com",
        "universe_domain": "googleapis.com"

*/