---
layout: post
title: Processing-I
---


Processing'in indirildiğini varsayarak başlayalım. ([buradan](https://processing.org/))

Yeni bir sketch açalım. Bir program oluşturmak için yazmamız gereken temel iki fonskiyon var.

Onlar şöyle:

```java
void setup() {

}

void draw() {

}

```

```setup()``` fonksiyonu programın başlamasıyla birlikte yalnızca 1 kez çalışır.
İlk değer atamaları ya da pencere genişliği gibi değerler burada belirlenir.


```draw()``` fonksiyonu ise sürekli çalışarak frame üretir. (saniyede frameRate kadar çalışır.)

&nbsp;
&nbsp;

# İlk Çıktı

İlk olarak şu kodlarla ilk çıktımızı alalım:

```java

void setup() {
 size(600,600);
 background(255);
}

void draw() {
  rectMode(CENTER);
  rect(width/2, height/2, 100, 100);
  
}

```

```setup()``` içerisinde ```size()``` pencere genişliğini ayarlar, şu durumda width=600, height=600 olarak başladık. background değeriyse 0-255 aralığında bir grayscale değeri.

```draw()``` içerisinde bir ```rect()``` ile bir dörtgen çizdirdik. üzerinde yazdığımız ```rectMode()``` ile dörtgeni nasıl çizdireceğimizi belirledik. Köşe yerine merkez koordinatlarını vermek için ```CENTER``` ile çağırdık.

```rect(centerX, centerY, width, height)``` parametrelerini alıyor, o yüzden merkezde ```100px x 100px``` bir dörtgen bekliyoruz.

![simple rectangle][img_01]


&nbsp;
&nbsp;

# Hareket

Peki hareket için neye ihtiyacımız var? Processing her saniye frameRate kadar ```draw()``` fonksiyonunu çağırdığı için dörtgenin pozisyonu her seferinde güncelleyerek yeniden çizdirmeliyiz. Şunu deneyelim:

```java

void setup() {
 size(600,600);
 background(255);
}

void draw() {
  rectMode(CENTER);
  rect(width/2 + frameCount, height/2, 100, 100);
  
}

```

```rect()``` fonksiyonunda ```x``` parametresine eklediğimiz ```frameCount``` değişkeni programın başından itibaren sayılan frame'leri tutan bir değişken. Böylece her frame değiştiğinde çizilecek dörtgenin pozisyonu güncellenir.

![moving rectangle][img_02]

Eğer böyle bir görüntü oluştuysa gayet normal, çünkü ```draw()``` her çalıştığında eski dörtgenlerin üstüne çiziyor. Bunu düzeltmek için ```draw()``` fonksiyonun hemen içine ekranı tekrar beyaza boyayıp eski görüntüyü silmek için ```background()``` fonksiyonunu yazalım.

```java
void draw() {
  background(255);
  rectMode(CENTER);
  rect(width/2 + frameCount, height/2, 100, 100);
}
```
![moving rectange 2][img_03]




[img_01]: /assets/images/01.png
[img_02]: /assets/images/02.png
[img_03]: /assets/images/03.gif