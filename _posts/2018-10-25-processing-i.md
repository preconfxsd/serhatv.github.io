---
layout: post
title: Processing  I
---


Processing'in indirildiğini varsayarak başlayalım. ([buradan](https://processing.org/))

Yeni bir sketch açalım. Bir processing programı oluşturmak için yazmamız gereken temel iki fonskiyon var.

Onlar şöyle:

```java
void setup() {

}

void draw() {

}

```

```setup()``` fonksiyonu programın başlamasıyla birlikte yalnızca 1 kez çalışır.
İlk değer atamaları ya da pencere genişliği gibi değerler burada belirlenir.


```draw()``` fonksiyonu ise sürekli çalışarak frame üretir. (saniyede [frameRate](https://processing.org/reference/frameRate_.html) kadar çalışır.)

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

```setup()``` içerisinde ```size()``` pencere genişliğini ayarlar, şu durumda ```width=600, height=600``` olarak başladık. background değeriyse```0-255 ```aralığında bir grayscale değeri.

```draw()``` içerisinde bir ```rect()``` ile bir dörtgen çizdireceğiz. Bir satır üzerinde yazdığımız ```rectMode()``` ile dörtgeni nasıl çizdireceğimizi belirledik. Köşe yerine merkez koordinatlarını vermek için ```CENTER``` ile çağırdık.

```rect(centerX, centerY, width, height)``` parametrelerini alıyor ([detay için](https://processing.org/reference/rect_.html)), o yüzden merkezde ```100px x 100px``` bir dörtgen bekliyoruz.

![simple rectangle][img_01]


&nbsp;
&nbsp;

# Hareket

Peki hareket için neye ihtiyacımız var? Pozisyon değişikliği (deltaX) olmaksızın hareket mümkün olmazdı. Processing her saniye [frameRate](https://processing.org/reference/frameRate_.html) kadar ```draw()``` fonksiyonunu çağırdığı için dörtgenin pozisyonu her seferinde güncelleyerek yeniden çizdirmeyi deneyebiliriz. Şunu yazalım o halde:

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


# fill and stroke

Çizdireceğimiz bir şeklin temelde iki parçasının rengini değiştirebiliriz: alan rengi ve kenar çizgisi rengi. Bunlar için ```fill()``` ve ```stroke()``` fonksiyonlarını kullanırız. İkisi de benzer şekilde içlerine birer renk değeri alırlar. ```draw()``` içerisini şöyle değiştirelim:

```java
void draw() {
  background(255);
  rectMode(CENTER);
  fill(0);
  rect(width/2 + frameCount, height/2, 100, 100);
}
```

Siyah bir dörtgen! Şimdilik bu kadar.

![black rectangle][img_04]


_daha sonra: transformations and matrixes_



[img_01]: /assets/images/01.png
[img_02]: /assets/images/02.png
[img_03]: /assets/images/03.gif
[img_04]: /assets/images/04.png