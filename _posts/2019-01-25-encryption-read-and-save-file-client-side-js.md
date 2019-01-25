---
layout: post
title: Encryption and File Reading/Saving with JavaScript
---

### The problem

It was about reading the log files on local disk which encoded in Base64 and encrypted by XOR operations. Then to save the decrypted data.



As you see in the graph, Log file encoded with Base64 and saved in a log file. Our goal is to read that encrypted log and by using the hash we calculated, extract the original log data.

### Reversing the process above

To achieve that, I will use the client side js libraries. Here is my path:

1. Read file
2. Generate sha256 hash from given key
3. Convert log content and hashed key to ByteArray (assume that file content is in Base64 format)
4. Apply XOR operations with given algorithm (I will discuss later)
5. Get Base64 format from output ByteArray
6. Convert to string

First, to convert to/from ByteArray I found a library  (because ```atob()``` and ```btoa()``` js functions have problem with utf-8 chars)([base64js](https://github.com/beatgammit/base64-js/)) and coded this function :

``` utils.js ```
```javascript
function Base64Encode(bytes) {
    return base64js.fromByteArray(bytes);
}

function Base64Decode(str) {
    return base64js.toByteArray(str);
}
```

I couldn't find any default methods for conversion of string <-> ByteArray so copied these from one of google's libs ([link](https://github.com/google/closure-library/blob/8598d87242af59aac233270742c8984e2b2bdbe0/closure/goog/crypt/crypt.js#L117-L143)):

``` utils.js ```
```javascript
function stringToUtf8ByteArray(str) {
  var out = [], p = 0;
  for (var i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i);
    if (c < 128) {
      out[p++] = c;
    } else if (c < 2048) {
      out[p++] = (c >> 6) | 192;
      out[p++] = (c & 63) | 128;
    } else if (
        ((c & 0xFC00) == 0xD800) && (i + 1) < str.length &&
        ((str.charCodeAt(i + 1) & 0xFC00) == 0xDC00)) {
      // Surrogate Pair
      c = 0x10000 + ((c & 0x03FF) << 10) + (str.charCodeAt(++i) & 0x03FF);
      out[p++] = (c >> 18) | 240;
      out[p++] = ((c >> 12) & 63) | 128;
      out[p++] = ((c >> 6) & 63) | 128;
      out[p++] = (c & 63) | 128;
    } else {
      out[p++] = (c >> 12) | 224;
      out[p++] = ((c >> 6) & 63) | 128;
      out[p++] = (c & 63) | 128;
    }
  }
  return out;
};

function utf8ByteArrayToString (bytes) {
  var out = [], pos = 0, c = 0;
  while (pos < bytes.length) {
    var c1 = bytes[pos++];
    if (c1 < 128) {
      out[c++] = String.fromCharCode(c1);
    } else if (c1 > 191 && c1 < 224) {
      var c2 = bytes[pos++];
      out[c++] = String.fromCharCode((c1 & 31) << 6 | c2 & 63);
    } else if (c1 > 239 && c1 < 365) {
      // Surrogate Pair
      var c2 = bytes[pos++];
      var c3 = bytes[pos++];
      var c4 = bytes[pos++];
      var u = ((c1 & 7) << 18 | (c2 & 63) << 12 | (c3 & 63) << 6 | c4 & 63) -
          0x10000;
      out[c++] = String.fromCharCode(0xD800 + (u >> 10));
      out[c++] = String.fromCharCode(0xDC00 + (u & 1023));
    } else {
      var c2 = bytes[pos++];
      var c3 = bytes[pos++];
      out[c++] =
          String.fromCharCode((c1 & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
    }
  }
  return out.join('');
};
```


After that I coded a function to apply the decoding process. The algorithm simply loops through the hashed key and applies XOR operation to the each byte.
``` utils.js ```

```javascript
later()
```


>To generate sha256 hashes, I used the [js-sha256](https://github.com/emn178/js-sha256) lib.

>To read log file from local disk, I've used [FileReader](https://developer.mozilla.org/tr/docs/Web/API/FileReader) API.

### Combine them all

Simply, when the file selected via input field, I read file and applied decoding methods above. Using another library ([browser-filesaver](https://github.com/tmpvar/browser-filesaver)) made the job easier with ``` saveAs(blob) ``` method to save the final log file.

``` main.js ```

```javascript
selectFileField.addEventListener('change', readFile, false);
  function readFile (evt) {
    var files = evt.target.files;
    var file = files[0];
    var reader = new FileReader();

    reader.onload = function(event) {
      var hashed = sha256(str);
      var logContent = event.target.result;
      logContent = logContent.substr(0, logContent.length-1); // have to remove last '\n' char
      var decryptedStr = encryptStringXOR(logContent, hashed);
      var blob = new Blob([decryptedStr], {type: "text/plain;charset=utf-8"});
      saveAs(blob, "encrypted_"+file.name);
    }
    reader.readAsBinaryString(file);
  }
```


_end_

[process_graph]: /assets/images/log-encryption-chart.png
