import pyttsx3 as pyttsx
# 调用初始化方法，获取讲话对象
engine = pyttsx.init()
engine.say('2022年11月11日')
engine.runAndWait()