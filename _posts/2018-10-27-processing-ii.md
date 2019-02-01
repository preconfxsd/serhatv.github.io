---
layout: post
title: Processing  II
---

_I'den devam_

# Döndürme ve Hareket Ettirme

Bildiklerimize şekillerin nasıl ve nerede çizileceğini belirten ```rotate()``` ve ```translate()``` fonksiyonlarını ekleyerek devam edelim.

```rotate()``` içerisine bir radian değeri alarak koordinat düzlemini çevirir. [(doc)](https://processing.org/reference/rotate_.html)

```translate()``` ise koordinat düzleminin merkezini içine aldığı koordinatlara taşır. [(doc)](https://processing.org/reference/translate_.html)

```java
/* setup() fonksiyonu burada */

void draw() {
	rectMode(CENTER);

	translate(width/2, height/2);
	rotate(PI / 180.0 * 45);
	rect(0,0,100,100);
}
```

![rotated rectangle][img_01]

görüntüsünü aldığımıza göre kodu açıklayalım:

```translate()``` fonksiyonuyla koordinat sisteminin merkezini ekranın ortasına taşıdık. (varsayılan merkez 0,0 - üst sol köşedir).

```rotate()``` ile ise, 45 derece döndürdük. ```(PI / 180.0)```i derece ifade etmek için yazdık.

son olarak ```rect()``` içerisinde dörtgenin ```x``` ve ```y``` koordinatlarını ```0``` olarak geçtik, çünkü artık yeni koordinat merkezimiz ```(width/2, height/2)``` (ekranın merkezi).


# popMatrix() ve pusMatrix()


```rotate()``` ve ```translate()``` fonksiyonlarını kullanırken aslında koordinat sistemini döndürdüğümüz ya da hareket ettirdiğimiz için sonraki çizdireceğimiz şekillerin de koordinatlarını yeniden hesaplamak gerekir. Bu karmaşıklığı çözmek için ```popMatrix()``` ve ```pushMatrix()``` kullanırız.

Kısaca şu işi yaparlar: Bu iki fonksiyon arasındaki döndürme ya da hareket ettirme işlemleri yapıldıktan sonra koordinat sistemi eski haline döner.

Şu kodu inceleyelim:

```java
/* setup() fonksiyonu burada */

void draw() {
	int rectCount = 8;
	float deg = PI / 180.0;
	float anglePerRect = 360.0/rectCount;

	pushMatrix();

	translate(width/2, height/2);

	for(int i = 0; i < rectCount; i++) {
		rotate(deg * anglePerRect * i);
		rect(120, 120, 100, 100);    
	}
  
	popMatrix();
}
```

Kod 8 tane dörtgen çizer ekrana, herbiri ekran merkezinde 360/8 derece döndürülmüştür.

```pushMatrix()``` ile ```popMatrix()``` arasındaki işlemleri izole ettik. ```translate()``` ile merkezi varsayılan ```(0,0)```'dan ```(width/2, height/2)```'ye taşıdık.  ```deg```(derece) ve ```anglePerRect``` (dörtgen başı döndürme) hesapladık.

Sonra ```for``` loop içerisinde döndürme işlemini yapıp dörtgeni çizdirdik.

Şöyle bir görüntü bekliyoruz.

![8 rotated rectangle][img_02]





[img_01]: /assets/images/2-01.png
[img_02]: /assets/images/2-02.png