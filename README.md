/* ====================================================================
 * Copyright (c) 2019 Alpha Cephei Inc. All rights
 * reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in
 *    the documentation and/or other materials provided with the
 *    distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY ALPHA CEPHEI INC. ``AS IS'' AND.
 * ANY EXPRESSED OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,.
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL ALPHA CEPHEI INC.
 * NOR ITS EMPLOYEES BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT.
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,.
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY.
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT.
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE.
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * ====================================================================
 *
 */

This directory contains Mandarin Chinese model trained with latest
sphinxtrain from aishell dataset.

Dictionary is derived from
https://www.mdbg.net/chinese/dictionary?page=cc-cedict CEDICT with some
rare phones collapsed

One have to train a proper language model for this.

# ASR

> Speech recognizes sensitive words

> python 语音识别敏感词

构建步骤:
1. 安装依赖
   ```bash
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
2. 文本转语音:
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
3. 语音转文本
   - 使用 PocketSphinx

        > PocketSphinx 是一个用于语音转换文本的开源 API。它是一个轻量级的语音识别引擎， 尽管在桌面端也能很好地工作，它还专门为手机和移动设备做过调优。
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
4. 普通话识别问题

> speech_recognition 默认识别英文，是不支持中文的，需要在Sphinx语音识别工具包里面下载对应的 普通话包 和 语言模型 。<https://sourceforge.net/projects/cmusphinx/files/Acoustic%20and%20Language%20Models/>

将zh-CN目录丢进`../Lib/site-packages/speech_recognition`。
