from app.redis.connection import redis_client
import secrets

def generate_otp():
    return f"{secrets.randbelow(1_000_000):06d}"

def store_otp(email: str, otp: str):
    key = f"otp:{email}"
    redis_client.setex(key, 300, otp)

def verify_otp(email: str, otp: str):
    key = f"otp:{email}"
    stored_otp = redis_client.get(key)

    if stored_otp is None:
        return False

    if stored_otp != otp:
        return False

    redis_client.delete(key)
    return True