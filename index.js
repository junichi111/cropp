// Croppieインスタンスを初期化
var croppieInstance = new Croppie(document.getElementById('croppie'), {
  viewport: { width: 200, height: 200, type: 'circle' },
  boundary: { width: 300, height: 300 }
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
  });
});
