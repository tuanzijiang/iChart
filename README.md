# iChart

This is a project combining data visualization with data analytics. 

As long as user upload some `Excel`, it can make some beautiful wechart tweets by analysising the data of `Excel`.  

Of course, users can change the style by themselves.

This is a single page application(SPA) based on `AngularJS`.We use `echarts` to deal with the picture. The back-end is based on `django`

We just finished the fisrt part that it can make some easy tweets and upload wechart system. If you are interesting in it, let's do it together~!

## Interface

We just finished three pages, but they are very important.

One for uploading `Excel`, one for editing the tweets , the last one for displaying the rendering result and making user easy to copy tweets on wechart system.

### Editing Page

We use `ui-router` to realize the nesting routing.

It is divide to three part:

#### Workspace part

![workspace part](https://github.com/sumAlbert/iChart/blob/master/src/source/display/iChart1.png?raw=true)

In the left column, you can change the kind of image-text.(eg. graphic、font、picture、wordcloud)

In the middle column, you can choose which part of tweets you are handling.  

In the right column, you can customize your image-text.

#### DisplayTable part

![DisplayTable part](https://github.com/sumAlbert/iChart/blob/master/src/source/display/iChart2.png?raw=true)

In this part, you can revise the table you upload. 

For example , if you find some error data in you table uploaded, you need not to upload again.Instead, you just click the cell you want to revise and input the right data. Please remember to save the operation you have done.    

#### DataBase part

![DataBase part](https://github.com/sumAlbert/iChart/blob/master/src/source/display/iChart3.png?raw=true)

In this part, we just finish the UI.

In the summer, I use network spiders to optain some data about
houseing price and distribution of sharing bike in Shanghai. Now it is worthless for us, but in my opinion it is priceless for others.  

As a result, I hope user can share their data in this part. 

### Upload Page

![Upload part](https://github.com/sumAlbert/iChart/blob/master/src/source/display/upload.gif?raw=true)

In this page, users can upload their data by draging their files or clicking the button. And then they can set their formate and rename them.

### Display Page

![Display part](https://github.com/sumAlbert/iChart/blob/master/src/source/display/wechat1.gif?raw=true)

Click the display button and then user can see the rendering results. We switch the image to `Base64` in order to adapt wechat system at the same time.

![Import into wechat](https://github.com/sumAlbert/iChart/blob/master/src/source/display/wechat2.gif?raw=true)

As long as user push down `Ctrl + A ` select all the page , `Ctrl + C` to copy and `Ctrl + V` to paste in the wechat system. They can get a beautiful tweet.


Reproduced and please indicate the source

[Try out by yourself!](https://github.com/sumAlbert/iChart/archive/master.zip)

 