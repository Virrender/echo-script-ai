from kokoro import KPipeline
import soundfile as sf

print("Loading pipeline...")
pipeline = KPipeline(lang_code="a")
print("Pipeline loaded!")

text = "Hello Virender. Welcome to Echo Script."

generator = pipeline(
    text=text,
    voice="af_heart",
)

audio = b""


for _, _, audio_chunk in generator:
    audio = audio_chunk
    break

sf.write("output.wav", audio, 24000)

print("Audio saved as output.wav")
