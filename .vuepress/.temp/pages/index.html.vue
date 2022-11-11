<template><div><h1 id="speech-recognizes-sensitive-words" tabindex="-1"><a class="header-anchor" href="#speech-recognizes-sensitive-words" aria-hidden="true">#</a> Speech recognizes sensitive words</h1>
<h2 id="语音转文本转语音" tabindex="-1"><a class="header-anchor" href="#语音转文本转语音" aria-hidden="true">#</a> 语音转文本转语音</h2>
<p>构建步骤:</p>
<h3 id="安装依赖" tabindex="-1"><a class="header-anchor" href="#安装依赖" aria-hidden="true">#</a> 安装依赖+</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>pip <span class="token function">install</span> numpy
<span class="token comment"># 数学运算库</span>
pip <span class="token function">install</span> matplotlib
<span class="token comment"># plot绘图库</span>
pip <span class="token function">install</span> scipy
<span class="token comment"># 音频处理库</span>
pip <span class="token function">install</span> python_speech_features
<span class="token comment"># 语音库</span>
pip <span class="token function">install</span> pyttsx3
<span class="token comment"># 文本转语音库,tts</span>
<span class="token comment"># 镜像:pip install -i https://mirrors.aliyun.com/pypi/simple pyttsx3</span>
pip <span class="token function">install</span> comtypes
<span class="token comment"># 读取文本转成语音.SpeechLib</span>
pip <span class="token function">install</span> PocketSphinx
<span class="token comment"># 轻量级语音转换文本的开源 API</span>
pip <span class="token function">install</span> SpeechRecognition
<span class="token comment"># 语音识别库</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="文本转语音" tabindex="-1"><a class="header-anchor" href="#文本转语音" aria-hidden="true">#</a> 文本转语音</h3>
<ul>
<li>
<p>使用 pyttsx</p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token keyword">import</span> pyttsx3 <span class="token keyword">as</span> pyttsx
<span class="token comment"># 调用初始化方法，获取讲话对象</span>
engine <span class="token operator">=</span> pyttsx<span class="token punctuation">.</span>init<span class="token punctuation">(</span><span class="token punctuation">)</span>
engine<span class="token punctuation">.</span>say<span class="token punctuation">(</span><span class="token string">'2022年11月11日'</span><span class="token punctuation">)</span>
engine<span class="token punctuation">.</span>runAndWait<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>使用 SAPI</p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token keyword">from</span> win32com<span class="token punctuation">.</span>client <span class="token keyword">import</span> Dispatch
<span class="token comment"># 获取讲话对象</span>
speaker <span class="token operator">=</span> Dispatch<span class="token punctuation">(</span><span class="token string">'SAPI.SpVoice'</span><span class="token punctuation">)</span>
<span class="token comment"># 讲话内容</span>
speaker<span class="token punctuation">.</span>Speak<span class="token punctuation">(</span><span class="token string">'你好！'</span><span class="token punctuation">)</span>
speaker<span class="token punctuation">.</span>Speak<span class="token punctuation">(</span><span class="token string">'睡得还好吗？'</span><span class="token punctuation">)</span>
<span class="token comment"># 释放对象</span>
<span class="token keyword">del</span> speaker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>使用 SpeechLib</p>
<blockquote>
<p>使用 SpeechLib，可以从文本文件中获取输入，再将其转换为语音。</p>
</blockquote>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token keyword">from</span> comtypes<span class="token punctuation">.</span>client <span class="token keyword">import</span> CreateObject
<span class="token keyword">from</span> comtypes<span class="token punctuation">.</span>gen <span class="token keyword">import</span> SpeechLib
<span class="token comment"># 获取语音对象,源头</span>
engine <span class="token operator">=</span> CreateObject<span class="token punctuation">(</span><span class="token string">'SAPI.SpVoice'</span><span class="token punctuation">)</span>
<span class="token comment"># 输出到目标对象的流</span>
stream <span class="token operator">=</span> CreateObject<span class="token punctuation">(</span><span class="token string">'SAPI.SpFileStream'</span><span class="token punctuation">)</span>
infile <span class="token operator">=</span> <span class="token string">'demo.txt'</span>
outfile <span class="token operator">=</span> <span class="token string">'demo_audio.wav'</span>
<span class="token comment"># 获取流写入通道</span>
stream<span class="token punctuation">.</span><span class="token builtin">open</span><span class="token punctuation">(</span>outfile<span class="token punctuation">,</span> SpeechLib<span class="token punctuation">.</span>SSFMCreateForWrite<span class="token punctuation">)</span>
<span class="token comment"># 给语音源头添加输出流</span>
engine<span class="token punctuation">.</span>AudioOutputStream <span class="token operator">=</span> stream
<span class="token comment"># 读取文本内容</span>
<span class="token comment"># 打开文件</span>
f <span class="token operator">=</span> <span class="token builtin">open</span><span class="token punctuation">(</span>infile<span class="token punctuation">,</span> <span class="token string">'r'</span><span class="token punctuation">,</span> encoding<span class="token operator">=</span><span class="token string">'utf-8'</span><span class="token punctuation">)</span>
<span class="token comment"># 读取文本内容</span>
theText <span class="token operator">=</span> f<span class="token punctuation">.</span>read<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment"># 关闭流对象</span>
f<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment"># 语音对象，读取文本内容</span>
engine<span class="token punctuation">.</span>speak<span class="token punctuation">(</span>theText<span class="token punctuation">)</span>
stream<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h3 id="语音转文本" tabindex="-1"><a class="header-anchor" href="#语音转文本" aria-hidden="true">#</a> 语音转文本</h3>
<ul>
<li>
<p>使用 PocketSphinx</p>
<blockquote>
<p>PocketSphinx 是一个用于语音转换文本的开源 API。它是一个轻量级的语音识别引擎， 尽管在桌面端也能很好地工作，它还专门为手机和移动设备做过调优。</p>
</blockquote>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token keyword">import</span> speech_recognition <span class="token keyword">as</span> sr
<span class="token comment"># 获取语音文件</span>
audio_file <span class="token operator">=</span> <span class="token string">'demo_audio.wav'</span>
<span class="token comment"># 获取识别语音内容的对象</span>
r <span class="token operator">=</span> sr<span class="token punctuation">.</span>Recognizer<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment"># 打开语音文件</span>
<span class="token keyword">with</span> sr<span class="token punctuation">.</span>AudioFile<span class="token punctuation">(</span>audio_file<span class="token punctuation">)</span> <span class="token keyword">as</span> source<span class="token punctuation">:</span>
    audio <span class="token operator">=</span> r<span class="token punctuation">.</span>record<span class="token punctuation">(</span>source<span class="token punctuation">)</span>
<span class="token comment"># 将语音转化为文本</span>
<span class="token comment"># print('文本内容:', r.recognize_sphinx(audio))  # recognize_sphinx() 参数中language='en-US' 默认是英语</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">'文本内容:'</span><span class="token punctuation">,</span> r<span class="token punctuation">.</span>recognize_sphinx<span class="token punctuation">(</span>audio<span class="token punctuation">,</span> language<span class="token operator">=</span><span class="token string">'zh-CN'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h3 id="普通话识别问题" tabindex="-1"><a class="header-anchor" href="#普通话识别问题" aria-hidden="true">#</a> 普通话识别问题</h3>
<blockquote>
<p>speech_recognition 默认识别英文，是不支持中文的，需要在Sphinx语音识别工具包里面下载对应的 普通话包 和 语言模型 。<a href="https://sourceforge.net/projects/cmusphinx/files/Acoustic%20and%20Language%20Models/" target="_blank" rel="noopener noreferrer">https://sourceforge.net/projects/cmusphinx/files/Acoustic%20and%20Language%20Models/<ExternalLinkIcon/></a></p>
</blockquote>
<p>将zh-CN目录丢进 <code v-pre>../Lib/site-packages/speech_recognition</code>。</p>
<h2 id="音频解析" tabindex="-1"><a class="header-anchor" href="#音频解析" aria-hidden="true">#</a> 音频解析</h2>
<h3 id="可视化音频信号-从文件读取并处理它" tabindex="-1"><a class="header-anchor" href="#可视化音频信号-从文件读取并处理它" aria-hidden="true">#</a> 可视化音频信号 - 从文件读取并处理它</h3>
<p>这是构建语音识别系统的第一步，因为它可以理解音频信号的结构。使用音频信号可以遵循的一些常见步骤如下</p>
<p>记录
当您必须从文件中读取音频信号时，首先使用麦克风录制它。</p>
<p>采样
使用麦克风录制时，信号以数字化形式存储。但是要对它进行处理，机器需要它们以离散的数字形式。因此，我们应该以特定频率进行采样并将信号转换为离散数字形式。选择高频采样意味着当人们听到信号时，他们会将其视为连续的音频信号。</p>
<p>例
以下示例显示了使用Python分析音频信号的逐步方法，该方法存储在文件中。该音频信号的频率为44,100HZ。</p>
<p>导入必要的包，如下所示</p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token keyword">import</span> numpy <span class="token keyword">as</span> np
<span class="token keyword">import</span> matplotlib<span class="token punctuation">.</span>pyplot <span class="token keyword">as</span> plt
<span class="token keyword">from</span> scipy<span class="token punctuation">.</span>io <span class="token keyword">import</span> wavfile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，读取存储的音频文件。它将返回两个值：采样频率和音频信号。提供存储它的音频文件的路径，如下所示</p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code>frequency_sampling<span class="token punctuation">,</span> audio_signal <span class="token operator">=</span> wavfile<span class="token punctuation">.</span>read<span class="token punctuation">(</span><span class="token string">"/Users/admin/audio_file.wav"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用显示的命令显示音频信号的采样频率，信号的数据类型及其持续时间等参数</p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">'\nSignal shape:'</span><span class="token punctuation">,</span> audio_signal<span class="token punctuation">.</span>shape<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">'Signal Datatype:'</span><span class="token punctuation">,</span> audio_signal<span class="token punctuation">.</span>dtype<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">'Signal duration:'</span><span class="token punctuation">,</span> <span class="token builtin">round</span><span class="token punctuation">(</span>audio_signal<span class="token punctuation">.</span>shape<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">/</span>
<span class="token builtin">float</span><span class="token punctuation">(</span>frequency_sampling<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">'seconds'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此步骤涉及对信号进行标准化，如下所示</p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code>audio_signal <span class="token operator">=</span> audio_signal <span class="token operator">/</span> np<span class="token punctuation">.</span>power<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在此步骤中，我们从此信号中提取前100个值以进行可视化。为此目的使用以下命令</p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code>audio_signal <span class="token operator">=</span> audio_signal <span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token number">100</span><span class="token punctuation">]</span>
time_axis <span class="token operator">=</span> <span class="token number">1000</span> <span class="token operator">*</span> np<span class="token punctuation">.</span>arange<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token builtin">len</span><span class="token punctuation">(</span>signal<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token builtin">float</span><span class="token punctuation">(</span>frequency_sampling<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，使用下面给出的命令可视化信号</p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code>plt<span class="token punctuation">.</span>plot<span class="token punctuation">(</span>time_axis<span class="token punctuation">,</span> signal<span class="token punctuation">,</span> color<span class="token operator">=</span><span class="token string">'blue'</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>xlabel<span class="token punctuation">(</span><span class="token string">'Time (milliseconds)'</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>ylabel<span class="token punctuation">(</span><span class="token string">'Amplitude'</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>title<span class="token punctuation">(</span><span class="token string">'Input audio signal'</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>您将能够看到输出图形和为上述音频信号提取的数据，如此处图像所示</p>
<p><img src="images/1668101695246.png" alt="可视化音频信号"></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>Signal shape: <span class="token punctuation">(</span><span class="token number">132300</span>,<span class="token punctuation">)</span>
Signal Datatype: int16
Signal duration: <span class="token number">3.0</span> seconds
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="表征音频信号-转换为频域" tabindex="-1"><a class="header-anchor" href="#表征音频信号-转换为频域" aria-hidden="true">#</a> 表征音频信号：转换为频域</h3>
<p>表征音频信号涉及将时域信号转换为频域，并通过以下方式理解其频率分量。这是一个重要的步骤，因为它提供了有关信号的大量信息。您可以使用傅里叶变换等数学工具来执行此转换。</p>
<p>例
以下示例逐步显示如何使用存储在文件中的Python来表征信号。请注意，这里我们使用傅里叶变换数学工具将其转换为频域。</p>
<p>导入必要的包，如下所示</p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token keyword">import</span> numpy <span class="token keyword">as</span> np
<span class="token keyword">import</span> matplotlib<span class="token punctuation">.</span>pyplot <span class="token keyword">as</span> plt
<span class="token keyword">from</span> scipy<span class="token punctuation">.</span>io <span class="token keyword">import</span> wavfile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，读取存储的音频文件。它将返回两个值：采样频率和音频信号。提供存储它的音频文件的路径，如此处的命令所示</p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code>frequency_sampling<span class="token punctuation">,</span> audio_signal <span class="token operator">=</span> wavfile<span class="token punctuation">.</span>read<span class="token punctuation">(</span><span class="token string">"/Users/admin/sample.wav"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在此步骤中，我们将使用下面给出的命令显示音频信号的采样频率，信号的数据类型及其持续时间等参数</p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">'\nSignal shape:'</span><span class="token punctuation">,</span> audio_signal<span class="token punctuation">.</span>shape<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">'Signal Datatype:'</span><span class="token punctuation">,</span> audio_signal<span class="token punctuation">.</span>dtype<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">'Signal duration:'</span><span class="token punctuation">,</span> <span class="token builtin">round</span><span class="token punctuation">(</span>audio_signal<span class="token punctuation">.</span>shape<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">/</span>
<span class="token builtin">float</span><span class="token punctuation">(</span>frequency_sampling<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">'seconds'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在此步骤中，我们需要对信号进行标准化，如以下命令所示 -</p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code>audio_signal <span class="token operator">=</span> audio_signal <span class="token operator">/</span> np<span class="token punctuation">.</span>power<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该步骤涉及提取信号的长度和长度。为此目的使用以下命令 -</p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code>length_signal <span class="token operator">=</span> <span class="token builtin">len</span><span class="token punctuation">(</span>audio_signal<span class="token punctuation">)</span>
half_length <span class="token operator">=</span> np<span class="token punctuation">.</span>ceil<span class="token punctuation">(</span><span class="token punctuation">(</span>length_signal <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2.0</span><span class="token punctuation">)</span><span class="token punctuation">.</span>astype<span class="token punctuation">(</span>np<span class="token punctuation">.</span><span class="token builtin">int</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们需要应用数学工具来转换为频域。这里我们使用傅立叶变换。</p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code>signal_frequency <span class="token operator">=</span> np<span class="token punctuation">.</span>fft<span class="token punctuation">.</span>fft<span class="token punctuation">(</span>audio_signal<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，做频域信号的归一化并将其平方 -</p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code>signal_frequency <span class="token operator">=</span> <span class="token builtin">abs</span><span class="token punctuation">(</span>signal_frequency<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">:</span>half_length<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">/</span> length_signal
signal_frequency <span class="token operator">**=</span> <span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，提取频率变换信号的长度和长度 -</p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code>len_fts <span class="token operator">=</span> <span class="token builtin">len</span><span class="token punctuation">(</span>signal_frequency<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>注意，必须调整傅里叶变换信号以及奇数情况。</p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token keyword">if</span> length_signal <span class="token operator">%</span> <span class="token number">2</span><span class="token punctuation">:</span>
   signal_frequency<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">:</span>len_fts<span class="token punctuation">]</span> <span class="token operator">*=</span> <span class="token number">2</span>
<span class="token keyword">else</span><span class="token punctuation">:</span>
   signal_frequency<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">:</span>len_fts<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">*=</span> <span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，以分贝（dB）提取功率 -</p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code>signal_power <span class="token operator">=</span> <span class="token number">10</span> <span class="token operator">*</span> np<span class="token punctuation">.</span>log10<span class="token punctuation">(</span>signal_frequency<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>为X轴调整以kHz为单位的频率</p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code>x_axis <span class="token operator">=</span> np<span class="token punctuation">.</span>arange<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> len_half<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token punctuation">(</span>frequency_sampling <span class="token operator">/</span> length_signal<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">1000.0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，可视化信号的特征描述如下</p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code>plt<span class="token punctuation">.</span>figure<span class="token punctuation">(</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>plot<span class="token punctuation">(</span>x_axis<span class="token punctuation">,</span> signal_power<span class="token punctuation">,</span> color<span class="token operator">=</span><span class="token string">'black'</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>xlabel<span class="token punctuation">(</span><span class="token string">'Frequency (kHz)'</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>ylabel<span class="token punctuation">(</span><span class="token string">'Signal power (dB)'</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>您可以观察上面代码的输出图，如下图所示</p>
<p><img src="/images/1668101728419.png" alt="表征音频信号"></p>
<h3 id="生成单调音频信号" tabindex="-1"><a class="header-anchor" href="#生成单调音频信号" aria-hidden="true">#</a> 生成单调音频信号</h3>
<p>到目前为止，您已经看到的两个步骤对于了解信号非常重要。现在，如果要生成带有一些预定义参数的音频信号，此步骤将非常有用。请注意，此步骤会将音频信号保存在输出文件中。</p>
<p>例
在下面的示例中，我们将使用Python生成单调信号，该信号将存储在文件中。为此，您必须采取以下步骤 -</p>
<p>如图所示导入必要的包 -</p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token keyword">import</span> numpy <span class="token keyword">as</span> np
<span class="token keyword">import</span> matplotlib<span class="token punctuation">.</span>pyplot <span class="token keyword">as</span> plt
<span class="token keyword">from</span> scipy<span class="token punctuation">.</span>io<span class="token punctuation">.</span>wavfile <span class="token keyword">import</span> write
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>提供应保存输出文件的文件</p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code>output_file <span class="token operator">=</span> <span class="token string">'audio_signal_generated.wav'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，指定您选择的参数，如图所示 -</p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code>duration <span class="token operator">=</span> <span class="token number">4</span> <span class="token comment"># in seconds</span>
frequency_sampling <span class="token operator">=</span> <span class="token number">44100</span> <span class="token comment"># in Hz</span>
frequency_tone <span class="token operator">=</span> <span class="token number">784</span>
min_val <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">4</span> <span class="token operator">*</span> np<span class="token punctuation">.</span>pi
max_val <span class="token operator">=</span> <span class="token number">4</span> <span class="token operator">*</span> np<span class="token punctuation">.</span>pi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这一步中，我们可以生成音频信号，如图所示 -</p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code>t <span class="token operator">=</span> np<span class="token punctuation">.</span>linspace<span class="token punctuation">(</span>min_val<span class="token punctuation">,</span> max_val<span class="token punctuation">,</span> duration <span class="token operator">*</span> frequency_sampling<span class="token punctuation">)</span>
audio_signal <span class="token operator">=</span> np<span class="token punctuation">.</span>sin<span class="token punctuation">(</span><span class="token number">2</span> <span class="token operator">*</span> np<span class="token punctuation">.</span>pi <span class="token operator">*</span> tone_freq <span class="token operator">*</span> t<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，将音频文件保存在输出文件中 -</p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code>write<span class="token punctuation">(</span>output_file<span class="token punctuation">,</span> frequency_sampling<span class="token punctuation">,</span> signal_scaled<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>提取图表的前100个值，如图所示 -</p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code>audio_signal <span class="token operator">=</span> audio_signal<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token number">100</span><span class="token punctuation">]</span>
time_axis <span class="token operator">=</span> <span class="token number">1000</span> <span class="token operator">*</span> np<span class="token punctuation">.</span>arange<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token builtin">len</span><span class="token punctuation">(</span>signal<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token builtin">float</span><span class="token punctuation">(</span>sampling_freq<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，将生成的音频信号可视化如下 -</p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code>plt<span class="token punctuation">.</span>plot<span class="token punctuation">(</span>time_axis<span class="token punctuation">,</span> signal<span class="token punctuation">,</span> color<span class="token operator">=</span><span class="token string">'blue'</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>xlabel<span class="token punctuation">(</span><span class="token string">'Time in milliseconds'</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>ylabel<span class="token punctuation">(</span><span class="token string">'Amplitude'</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>title<span class="token punctuation">(</span><span class="token string">'Generated audio signal'</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>您可以观察到如下图所示的情节</p>
<p><img src="images/1668101900599.png" alt="1668101900599"></p>
<h3 id="生成单调音频信号-1" tabindex="-1"><a class="header-anchor" href="#生成单调音频信号-1" aria-hidden="true">#</a> 生成单调音频信号</h3>
<p>语音特征提取
这是构建语音识别器的最重要步骤，因为在将语音信号转换为频域后，我们必须将其转换为可用的特征向量形式。为此，我们可以使用不同的特征提取技术，如MFCC，PLP，PLP- RASTA等。</p>
<p>例
在下面的示例中，我们将使用Python，使用MFCC技术逐步从信号中提取信号。</p>
<p>导入必要的包，如下所示 -</p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token keyword">import</span> numpy <span class="token keyword">as</span> np
<span class="token keyword">import</span> matplotlib<span class="token punctuation">.</span>pyplot <span class="token keyword">as</span> plt
<span class="token keyword">from</span> scipy<span class="token punctuation">.</span>io <span class="token keyword">import</span> wavfile
<span class="token keyword">from</span> python_speech_features <span class="token keyword">import</span> mfcc<span class="token punctuation">,</span> logfbank
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，读取存储的音频文件。它将返回两个值 - 采样频率和音频信号。提供存储它的音频文件的路径。</p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code>frequency_sampling<span class="token punctuation">,</span> audio_signal <span class="token operator">=</span> wavfile<span class="token punctuation">.</span>read<span class="token punctuation">(</span><span class="token string">"/Users/admin/audio_file.wav"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>请注意，我们在这里采用前15000个样本进行分析。</p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code>audio_signal <span class="token operator">=</span> audio_signal<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token number">15000</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用MFCC技术并执行以下命令以提取MFCC功能 -</p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code>features_mfcc <span class="token operator">=</span> mfcc<span class="token punctuation">(</span>audio_signal<span class="token punctuation">,</span> frequency_sampling<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，打印MFCC参数，如图所示 -</p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">'\nMFCC:\nNumber of windows ='</span><span class="token punctuation">,</span> features_mfcc<span class="token punctuation">.</span>shape<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">'Length of each feature ='</span><span class="token punctuation">,</span> features_mfcc<span class="token punctuation">.</span>shape<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，使用下面给出的命令绘制和可视化MFCC功能 -</p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code>features_mfcc <span class="token operator">=</span> features_mfcc<span class="token punctuation">.</span>T
plt<span class="token punctuation">.</span>matshow<span class="token punctuation">(</span>features_mfcc<span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>title<span class="token punctuation">(</span><span class="token string">'MFCC'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在此步骤中，我们使用如图所示的过滤器库功能 -</p>
<p>提取过滤器库功能 -</p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code>filterbank_features <span class="token operator">=</span> logfbank<span class="token punctuation">(</span>audio_signal<span class="token punctuation">,</span> frequency_sampling<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，打印filterbank参数。</p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">'\nFilter bank:\nNumber of windows ='</span><span class="token punctuation">,</span> filterbank_features<span class="token punctuation">.</span>shape<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">'Length of each feature ='</span><span class="token punctuation">,</span> filterbank_features<span class="token punctuation">.</span>shape<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，绘制并可视化滤波器组功能。</p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code>filterbank_features <span class="token operator">=</span> filterbank_features<span class="token punctuation">.</span>T
plt<span class="token punctuation">.</span>matshow<span class="token punctuation">(</span>filterbank_features<span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>title<span class="token punctuation">(</span><span class="token string">'Filter bank'</span><span class="token punctuation">)</span>
plt<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>根据上述步骤，您可以观察到以下输出：图1表示MFCC，图2表示滤波器组</p>
<p><img src="images/1668101913458.png" alt="1668101913458"></p>
<p><img src="images/1668101919353.png" alt="1668101919353"></p>
<h3 id="语音特征提取" tabindex="-1"><a class="header-anchor" href="#语音特征提取" aria-hidden="true">#</a> 语音特征提取</h3>
<p>过滤银行</p>
<p>对口语的认识
语音识别意味着当人类说话时，机器会理解它。我们在这里使用Python中的Google Speech API来实现它。我们需要为此安装以下软件包 -</p>
<p>Pyaudio - 可以使用 pip install Pyaudio 命令 安装 。</p>
<p>SpeechRecognition - 可以使用 pip install SpeechRecognition 安装此软件包 。</p>
<p>Google-Speech-API - 可以使用命令 pip install google-api-python-client进行安装 。</p>
<p>例
请注意以下示例以了解口头语言的识别</p>
<p>如图所示导入必要的包</p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token keyword">import</span> speech_recognition <span class="token keyword">as</span> sr
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>创建一个对象，如下所示</p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code>recording <span class="token operator">=</span> sr<span class="token punctuation">.</span>Recognizer<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在， Microphone（） 模块将把声音作为输入</p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token keyword">with</span> sr<span class="token punctuation">.</span>Microphone<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">as</span> source<span class="token punctuation">:</span> recording<span class="token punctuation">.</span>adjust_for_ambient_noise<span class="token punctuation">(</span>source<span class="token punctuation">)</span>
   <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"Please Say something:"</span><span class="token punctuation">)</span>
   audio <span class="token operator">=</span> recording<span class="token punctuation">.</span>listen<span class="token punctuation">(</span>source<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，谷歌API将识别语音并提供输出。</p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token keyword">try</span><span class="token punctuation">:</span>
   <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"You said: \n"</span> <span class="token operator">+</span> recording<span class="token punctuation">.</span>recognize_google<span class="token punctuation">(</span>audio<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">except</span> Exception <span class="token keyword">as</span> e<span class="token punctuation">:</span>
   <span class="token keyword">print</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你可以看到以下输出</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>Please Say Something:
You said:
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>例如，如果你说 codingdict.com ，那么系统会正确识别它，如下所示</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>codingdict.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div></template>


