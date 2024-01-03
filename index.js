// Croppieインスタンスを初期化し、プレースホルダー画像をバインドする
var croppieInstance = new Croppie(document.getElementById('croppie'), {
  viewport: { width: 200, height: 200, type: 'circle' },
  boundary: { width: 300, height: 300 }
});
croppieInstance.bind({
  url: "https://raw.githubusercontent.com/ik2i03/cropp/main/IMG_0313.PNG" // プレースホルダー画像のURL
});

// 画像アップロード時のイベント
document.getElementById('upload').addEventListener('change', function () {
  var reader = new FileReader();
  reader.onload = function (e) {
    croppieInstance.bind({
      url: e.target.result
    });
  };
  reader.readAsDataURL(this.files[0]);
});

// ダウンロードボタンクリック時のイベント
document.getElementById('download').addEventListener('click', function () {
  // ローディングインジケーターを表示
  document.getElementById('loader').style.display = 'block';

  croppieInstance.result({
    type: 'blob',
    size: 'original',
    quality: 1,
    format: 'png'
  }).then(function (blob) {
    // ダウンロード処理
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'cropped_image.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }).finally(function() {
    // ローディングインジケーターを非表示
    document.getElementById('loader').style.display = 'none';
  });
});
