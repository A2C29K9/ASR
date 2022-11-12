---
lang: zh-CN
title: ASR
description: Speech recognizes sensitive words
order: 10
template: overrides/main.html
---
# Speech recognizes sensitive words

## 语音转文本转语音

### 安装依赖+

```bash
pip install pyaudio
# 音频剪辑库
pip install numpy
# 数学运算库
pip install matplotlib
# plot绘图库
pip install scipy
# 音频处理库
pip install python_speech_features
# 语音库
pip install pyttsx3
# 文本转语音库,tts
# 镜像:pip install -i https://mirrors.aliyun.com/pypi/simple pyttsx3
pip install comtypes
# 读取文本转成语音.SpeechLib
pip install PocketSphinx
# 轻量级语音转换文本的开源 API
pip install SpeechRecognition
# 语音识别库
```

### 文本转语音

- 使用 pyttsx

  ```py
  import pyttsx3 as pyttsx
  # 调用初始化方法，获取讲话对象
  engine = pyttsx.init()
  engine.say('2022年11月11日')
  engine.runAndWait()
  ```
- 使用 SAPI

  ```py
  from win32com.client import Dispatch
  # 获取讲话对象
  speaker = Dispatch('SAPI.SpVoice')
  # 讲话内容
  speaker.Speak('你好！')
  speaker.Speak('睡得还好吗？')
  # 释放对象
  del speaker
  ```
- 使用 SpeechLib

  > 使用 SpeechLib，可以从文本文件中获取输入，再将其转换为语音。
  >

  ```py
  from comtypes.client import CreateObject
  from comtypes.gen import SpeechLib
  # 获取语音对象,源头
  engine = CreateObject('SAPI.SpVoice')
  # 输出到目标对象的流
  stream = CreateObject('SAPI.SpFileStream')
  infile = 'demo.txt'
  outfile = 'demo_audio.wav'
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
  ```

### 语音转文本

- 使用 PocketSphinx

  > PocketSphinx 是一个用于语音转换文本的开源 API。它是一个轻量级的语音识别引擎， 尽管在桌面端也能很好地工作，它还专门为手机和移动设备做过调优。
  >

  ```py
  import speech_recognition as sr
  # 获取语音文件
  audio_file = 'demo_audio.wav'
  # 获取识别语音内容的对象
  r = sr.Recognizer()
  # 打开语音文件
  with sr.AudioFile(audio_file) as source:
      audio = r.record(source)
  # 将语音转化为文本
  # print('文本内容:', r.recognize_sphinx(audio))  # recognize_sphinx() 参数中language='en-US' 默认是英语
  print('文本内容:', r.recognize_sphinx(audio, language='zh-CN'))
  ```

### 普通话识别问题

> speech_recognition 默认识别英文，是不支持中文的，需要在Sphinx语音识别工具包里面下载对应的 普通话包 和 语言模型 。[https://sourceforge.net/projects/cmusphinx/files/Acoustic%20and%20Language%20Models/](https://sourceforge.net/projects/cmusphinx/files/Acoustic%20and%20Language%20Models/)

将zh-CN目录丢进 `../Lib/site-packages/speech_recognition`。

## 音频解析

### 可视化音频信号 - 从文件读取并处理它

这是构建语音识别系统的第一步，因为它可以理解音频信号的结构。使用音频信号可以遵循的一些常见步骤如下

记录
当您必须从文件中读取音频信号时，首先使用麦克风录制它。

采样
使用麦克风录制时，信号以数字化形式存储。但是要对它进行处理，机器需要它们以离散的数字形式。因此，我们应该以特定频率进行采样并将信号转换为离散数字形式。选择高频采样意味着当人们听到信号时，他们会将其视为连续的音频信号。

例
以下示例显示了使用Python分析音频信号的逐步方法，该方法存储在文件中。该音频信号的频率为44,100HZ。

导入必要的包，如下所示

```py
import numpy as np
import matplotlib.pyplot as plt
from scipy.io import wavfile
```

现在，读取存储的音频文件。它将返回两个值：采样频率和音频信号。提供存储它的音频文件的路径，如下所示

```py
frequency_sampling, audio_signal = wavfile.read("/Users/admin/audio_file.wav")
```

使用显示的命令显示音频信号的采样频率，信号的数据类型及其持续时间等参数

```py
print('\nSignal shape:', audio_signal.shape)
print('Signal Datatype:', audio_signal.dtype)
print('Signal duration:', round(audio_signal.shape[0] /
float(frequency_sampling), 2), 'seconds')
```

此步骤涉及对信号进行标准化，如下所示

```py
audio_signal = audio_signal / np.power(2, 15)
```

在此步骤中，我们从此信号中提取前100个值以进行可视化。为此目的使用以下命令

```py
audio_signal = audio_signal [:100]
time_axis = 1000 * np.arange(0, len(signal), 1) / float(frequency_sampling)
```

现在，使用下面给出的命令可视化信号

```py
plt.plot(time_axis, signal, color='blue')
plt.xlabel('Time (milliseconds)')
plt.ylabel('Amplitude')
plt.title('Input audio signal')
plt.show()
```

您将能够看到输出图形和为上述音频信号提取的数据，如此处图像所示

![可视化音频信号](https://www.codingdict.com/static/assets/tutorials/ai/py_ai/visualizing_audio_signals.jpg)

```bash
Signal shape: (132300,)
Signal Datatype: int16
Signal duration: 3.0 seconds
```

### 表征音频信号：转换为频域

表征音频信号涉及将时域信号转换为频域，并通过以下方式理解其频率分量。这是一个重要的步骤，因为它提供了有关信号的大量信息。您可以使用傅里叶变换等数学工具来执行此转换。

例
以下示例逐步显示如何使用存储在文件中的Python来表征信号。请注意，这里我们使用傅里叶变换数学工具将其转换为频域。

导入必要的包，如下所示

```py
import numpy as np
import matplotlib.pyplot as plt
from scipy.io import wavfile
```

现在，读取存储的音频文件。它将返回两个值：采样频率和音频信号。提供存储它的音频文件的路径，如此处的命令所示

```py
frequency_sampling, audio_signal = wavfile.read("/Users/admin/sample.wav")
```

在此步骤中，我们将使用下面给出的命令显示音频信号的采样频率，信号的数据类型及其持续时间等参数

```py
print('\nSignal shape:', audio_signal.shape)
print('Signal Datatype:', audio_signal.dtype)
print('Signal duration:', round(audio_signal.shape[0] /
float(frequency_sampling), 2), 'seconds')
```

在此步骤中，我们需要对信号进行标准化，如以下命令所示 -

```py
audio_signal = audio_signal / np.power(2, 15)
```

该步骤涉及提取信号的长度和长度。为此目的使用以下命令 -

```py
length_signal = len(audio_signal)
half_length = np.ceil((length_signal + 1) / 2.0).astype(np.int)
```

现在，我们需要应用数学工具来转换为频域。这里我们使用傅立叶变换。

```py
signal_frequency = np.fft.fft(audio_signal)
```

现在，做频域信号的归一化并将其平方 -

```py
signal_frequency = abs(signal_frequency[0:half_length]) / length_signal
signal_frequency **= 2
```

接下来，提取频率变换信号的长度和长度 -

```py
len_fts = len(signal_frequency)
```

注意，必须调整傅里叶变换信号以及奇数情况。

```py
if length_signal % 2:
   signal_frequency[1:len_fts] *= 2
else:
   signal_frequency[1:len_fts-1] *= 2
```

现在，以分贝（dB）提取功率 -

```py
signal_power = 10 * np.log10(signal_frequency)
```

为X轴调整以kHz为单位的频率

```py
x_axis = np.arange(0, len_half, 1) * (frequency_sampling / length_signal) / 1000.0
```

现在，可视化信号的特征描述如下

```py
plt.figure()
plt.plot(x_axis, signal_power, color='black')
plt.xlabel('Frequency (kHz)')
plt.ylabel('Signal power (dB)')
plt.show()
```

您可以观察上面代码的输出图，如下图所示

![表征音频信号](https://www.codingdict.com/static/assets/tutorials/ai/py_ai/characterizing_audio_signal.jpg)

### 生成单调音频信号

到目前为止，您已经看到的两个步骤对于了解信号非常重要。现在，如果要生成带有一些预定义参数的音频信号，此步骤将非常有用。请注意，此步骤会将音频信号保存在输出文件中。

例
在下面的示例中，我们将使用Python生成单调信号，该信号将存储在文件中。为此，您必须采取以下步骤 -

如图所示导入必要的包 -

```py
import numpy as np
import matplotlib.pyplot as plt
from scipy.io.wavfile import write
```

提供应保存输出文件的文件

```py
output_file = 'audio_signal_generated.wav'
```

现在，指定您选择的参数，如图所示 -

```py
duration = 4 # in seconds
frequency_sampling = 44100 # in Hz
frequency_tone = 784
min_val = -4 * np.pi
max_val = 4 * np.pi
```

在这一步中，我们可以生成音频信号，如图所示 -

```py
t = np.linspace(min_val, max_val, duration * frequency_sampling)
audio_signal = np.sin(2 * np.pi * tone_freq * t)
```

现在，将音频文件保存在输出文件中 -

```py
write(output_file, frequency_sampling, signal_scaled)
```

提取图表的前100个值，如图所示 -

```py
audio_signal = audio_signal[:100]
time_axis = 1000 * np.arange(0, len(signal), 1) / float(sampling_freq)
```

现在，将生成的音频信号可视化如下 -

```py
plt.plot(time_axis, signal, color='blue')
plt.xlabel('Time in milliseconds')
plt.ylabel('Amplitude')
plt.title('Generated audio signal')
plt.show()
```

您可以观察到如下图所示的情节

![1668101900599](https://www.codingdict.com/static/assets/tutorials/ai/py_ai/generating_monotone_audio_signal.jpg)

### 生成单调音频信号

语音特征提取
这是构建语音识别器的最重要步骤，因为在将语音信号转换为频域后，我们必须将其转换为可用的特征向量形式。为此，我们可以使用不同的特征提取技术，如MFCC，PLP，PLP- RASTA等。

例
在下面的示例中，我们将使用Python，使用MFCC技术逐步从信号中提取信号。

导入必要的包，如下所示 -

```py
import numpy as np
import matplotlib.pyplot as plt
from scipy.io import wavfile
from python_speech_features import mfcc, logfbank
```

现在，读取存储的音频文件。它将返回两个值 - 采样频率和音频信号。提供存储它的音频文件的路径。

```py
frequency_sampling, audio_signal = wavfile.read("/Users/admin/audio_file.wav")
```

请注意，我们在这里采用前15000个样本进行分析。

```py
audio_signal = audio_signal[:15000]
```

使用MFCC技术并执行以下命令以提取MFCC功能 -

```py
features_mfcc = mfcc(audio_signal, frequency_sampling)
```

现在，打印MFCC参数，如图所示 -

```py
print('\nMFCC:\nNumber of windows =', features_mfcc.shape[0])
print('Length of each feature =', features_mfcc.shape[1])
```

现在，使用下面给出的命令绘制和可视化MFCC功能 -

```py
features_mfcc = features_mfcc.T
plt.matshow(features_mfcc)
plt.title('MFCC')
```

在此步骤中，我们使用如图所示的过滤器库功能 -

提取过滤器库功能 -

```py
filterbank_features = logfbank(audio_signal, frequency_sampling)
```

现在，打印filterbank参数。

```py
print('\nFilter bank:\nNumber of windows =', filterbank_features.shape[0])
print('Length of each feature =', filterbank_features.shape[1])
```

现在，绘制并可视化滤波器组功能。

```py
filterbank_features = filterbank_features.T
plt.matshow(filterbank_features)
plt.title('Filter bank')
plt.show()
```

根据上述步骤，您可以观察到以下输出：图1表示MFCC，图2表示滤波器组

![1668101913458](https://www.codingdict.com/static/assets/tutorials/ai/py_ai/feature_extraction_from_speech.jpg)

![1668101919353](https://www.codingdict.com/static/assets/tutorials/ai/py_ai/filter_bank.jpg)

### 语音特征提取

过滤银行

对口语的认识
语音识别意味着当人类说话时，机器会理解它。我们在这里使用Python中的Google Speech API来实现它。我们需要为此安装以下软件包 -

Pyaudio - 可以使用 pip install Pyaudio 命令 安装 。

SpeechRecognition - 可以使用 pip install SpeechRecognition 安装此软件包 。

Google-Speech-API - 可以使用命令 pip install google-api-python-client进行安装 。

例
请注意以下示例以了解口头语言的识别

如图所示导入必要的包

```py
import speech_recognition as sr
```

创建一个对象，如下所示

```py
recording = sr.Recognizer()
```

现在， Microphone（） 模块将把声音作为输入

```py
with sr.Microphone() as source: recording.adjust_for_ambient_noise(source)
   print("Please Say something:")
   audio = recording.listen(source)
```

现在，谷歌API将识别语音并提供输出。

```py
try:
   print("You said: \n" + recording.recognize_google(audio))
except Exception as e:
   print(e)
```

你可以看到以下输出

```bash
Please Say Something:
You said:
```

例如，如果你说 codingdict.com ，那么系统会正确识别它，如下所示

```bash
codingdict.com
```
