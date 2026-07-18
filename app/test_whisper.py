import whisper

print("=====>>Loading model...")

model = whisper.load_model("base")

print("======>>Model loaded!")

result = model.transcribe("app\recordings\2a561633-2a4b-4cc1-94f5-248f465aaf73.webm")
print(result["text"])