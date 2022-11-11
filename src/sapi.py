from win32com.client import Dispatch
# 获取讲话对象
speaker = Dispatch('SAPI.SpVoice')
# 讲话内容
speaker.Speak('你好！')
speaker.Speak('睡得还好吗？')
# 释放对象
del speaker