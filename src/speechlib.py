from comtypes.client import CreateObject
from comtypes.gen import SpeechLib
# 获取语音对象,源头
engine = CreateObject('SAPI.SpVoice')
# 输出到目标对象的流
stream = CreateObject('SAPI.SpFileStream')
infile = 'src/demo.txt'
outfile = 'src/demo_audio.wav'
# 获取流写入通道
stream.open(outfile, SpeechLib.SSFMCreateForWrite)
# 给语音源头添加输出流
engine.AudioOutputStream = stream
# 读取文本内容
# 打开文件
f = open(infile, 'r', encoding='utf-8')
# 读取文本内容
theText = f.read()
# 关闭流对象
f.close()
# 语音对象，读取文本内容
engine.speak(theText)
stream.close()