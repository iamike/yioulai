var loadI = 0;
var styleValue = 1;
var PAni = 0;
var pon = true;
var canvas640;
var version = '2015-9-30';
var static_path = './';
var myScroll, myScroll2;

function imageLoad(s) {
  var urlset = [],
    undefined, toString = Object.prototype.toString;
  switch (toString.apply(s.url)) {
    case '[object String]':
      urlset[urlset.length] = s.url;
      break;
    case '[object Array]':
      if (!s.url.length) {
        return false;
      }
      urlset = s.url;
      break;
    case '[object Function]':
      s.url = s.url();
      return imageLoad(s);
    default:
      return false;
  }
  var imgset = [],
    r = {
      total: urlset.length,
      load: 0,
      error: 0,
      abort: 0,
      complete: 0,
      currentIndex: 0
    },
    timer,
    _defaults = {
      url: '',
      onload: 'function',
      onerror: 'function',
      oncomplete: 'function',
      ready: 'function',
      complete: 'function',
      timeout: 15
    };
  for (var v in _defaults) {
    s[v] = s[v] === undefined ? _defaults[v] : s[v];
  }
  s.timeout = parseInt(s.timeout) || _defaults.timeout;
  timer = setTimeout(_callback, s.timeout * 1000);
  for (var i = 0, l = urlset.length, img; i < l; i++) {
    img = new Image();
    img.loaded = false;
    imgset[imgset.length] = img;
  }
  for (i = 0, l = imgset.length; i < l; i++) {
    imgset[i].onload = function() {
      _imageHandle.call(this, 'load', i);
    };
    imgset[i].onerror = function() {
      _imageHandle.call(this, 'error', i);
    };
    imgset[i].onabort = function() {
      _imageHandle.call(this, 'abort', i);
    };
    imgset[i].src = '' + urlset[i];
  }
  if (_isFn(s.ready)) {
    s.ready.call({}, imgset, r);
  }

  function _imageHandle(handle, index) {
    r.currentIndex = index;
    switch (handle) {
      case 'load':
        this.onload = null;
        this.loaded = true;
        r.load++;
        if (_isFn(s.onload)) {
          s.onload.call(this, r);
        }
        break;
      case 'error':
        r.error++;
        if (_isFn(s.onerror)) {
          s.onerror.call(this, r);
        }
        break;
      case 'abort':
        r.abort++;
        break;
    }
    r.complete++;
    // oncomplete 事件回调
    if (_isFn(s.oncomplete)) {
      s.oncomplete.call(this, r);
    }
    // 判断全局加载
    if (r.complete === imgset.length) {
      _callback();
    }
  }

  function _callback() {
    clearTimeout(timer);
    if (_isFn(s.complete)) {
      s.complete.call({}, imgset, r);
    }
  }

  function _isFn(fn) {
    return toString.apply(fn) === '[object Function]';
  }
  return true;
}


function orient() {
  if (window.orientation == 0 || window.orientation == 180) {

    $("#waring").hide();

    return false;
  } else if (window.orientation == 90 || window.orientation == -90) {

    $("#waring").show();
    return false;
  }
}


function AnimateLoading() {
  loadI++;
  if (loadI == 7) {
    loadI = 0;
  }
  $(".PageUi1").hide();
  $(".PageUi1").eq(loadI).show();
}

function LoadInit() {
  var Ww = $(window).width();
  var EH = (Ww / 640) * 684;
  $(".EditDiv,#img-container,#CanvasResult").css({
    width: Ww,
    height: EH
  });
  $(".cropper-modal").css({
    width: Ww
  });


}

function SelectCover(index) {
  $(".cropper-modal").css({
    'background-image': 'url(images/style' + index + '.png)'
  });
  //$("#Page4Bg").html('<img src="{$static_path}images/stylebg'+index+'.jpg" width="100%" />');
  $(".PageDiv4").css({
    background: 'url(images/stylebg' + index + '.jpg) no-repeat left top',
    'background-size': '100% 100%'
  });
  //$("#CoverStyle").val(index);
  styleValue = index;
}

imageLoad({
  url: function(v) {
    v = [static_path + 'images/bowsertext.png', static_path + 'images/bowsertext.png', static_path + 'images/btn1.png', static_path + 'images/btn2.png', static_path + 'images/btn3.png', static_path + 'images/close.png', static_path +
      'images/covergirlbtn.png', static_path + 'images/editbtn.png', static_path + 'images/followtxt.png', static_path + 'images/gzh.png', static_path + 'images/icon.jpg', static_path + 'images/kv.png', static_path + 'images/kvt1.png',
      static_path + 'images/kvt2.png', static_path + 'images/kvt3.png', static_path + 'images/kvt4.png', static_path + 'images/savejpg.jpg', static_path + 'images/share.png', static_path + 'images/startbtn.png', static_path +
      'images/style1.png', static_path + 'images/style2.png', static_path + 'images/style3.png', static_path + 'images/style4.png', static_path + 'images/stylebg1.jpg', static_path + 'images/stylebg2.jpg', static_path +
      'images/stylebg3.jpg', static_path + 'images/stylebg4.jpg', static_path + 'images/styleicon1.jpg', static_path + 'images/styleicon2.jpg', static_path + 'images/styleicon3.jpg', static_path + 'images/styleicon4.jpg', static_path +
      'images/submitbtn.png', static_path + 'images/uploadbtn.jpg'
    ];
    return v;
  },
  oncomplete: function(s) {
    var fid = parseInt((s.complete / s.total) * 100);
    if (fid > 20 && pon == true) {
      pon = false;
      $(".PageDiv1").show();
      PAni = setInterval(function() {
        AnimateLoading();
      }, 250);

    }
    $(".parentLoadingNumber").html(fid);

    //	$('#status').html( '正在加载...'+s.complete+'/'+s.total);
    //$('#processing').html(this.src);
  },
  complete: function(imgs, s) {
    loaded();
    $(".loadingNum").hide();
    LoadInit()
    $(".PageDiv1").show();
    $(".PageDiv3").hide();
    $(".prizediv").css({
      height: ($(window).height() - 20 - 40)
    })
    setTimeout(function() {
      Page2();

    }, 1500);

  }

});

function Page2() {
  if (PAni) {
    clearInterval(PAni);
  }
  $(".PageDiv1").hide();
  $(".PageDiv2").show();
  $("#Page2Text").show();
  Page2Animate1();
}
var c = 0;

function Page2Animate1() {
  $("#Page2Text>div").eq(c).show().addClass("animated fadeInUp");
  c++;
  if (c == 5) {

    setTimeout(function() {
      Page2Animate2()
    }, 1200)
    return;
  }
  setTimeout(function() {
    Page2Animate1()
  }, 500)
}

function Page2Animate2() {
  $("#Page2Text").addClass("animated fadeOutUp");
  setTimeout(function() {
    $("#Page2Text").hide();
    $("#Page2BtnAll").show();
    Page2Animate3();
  }, 1200)
}

function Page2Animate3() {
  $(".StartGameBtn").show().addClass("animated fadeInUpBig");
  setTimeout(function() {
    $("#BtnListID>.Btnlist").eq(0).show().addClass("animated bounceInLeft");
    $("#BtnListID>.Btnlist").eq(1).show().addClass("animated bounceInUp");
    $("#BtnListID>.Btnlist").eq(2).show().addClass("animated bounceInRight");
  }, 800)
}

function StartGame() {
  $(".PageDiv2").hide();
  $(".PageDiv3").css("opacity", 1).show();
  $(".popup").show();

}

function EditCanvas() {
  $(".PageDiv4").hide();
  $(".PageDiv3").show();

}

function submitData() {
  if (canvas640 == "") {
    alert('封面为空哦！');
    return false;
  }
  var userName = $.trim($("#userName").val());
  var phone = $.trim($("#phone").val());
  if (userName == "") {
    alert('姓名不能为空哦！');
    return false;
  }
  if (phone == "") {
    alert('手机不能为空哦！');
    return false;
  }
  if (!checkMobile(phone)) {
    alert('手机号码不正确哦！');
    return false;
  }
  $.ajax({
    type: 'post',
    url: "upload.php",
    dataType: "json",
    data: {
      userName: userName,
      phone: phone,
      data: canvas640
    },
    beforeSend: function() {
      $(".loading").show();
      $("#loadingtips").html("上传中...");
    },
    success: function(data) {
      $(".loading").hide();
      if (data.rsp) {
        location.href = "sharePage.php?id=" + data.id + "&uid=" + data.uid;
      } else {
        alert(data.errorMsg);
        return false;
      }
    },
    error: function(data) {}
  });
}

function checkMobile(value) {
  if (value != "") {
    var reg = /^1[3,4,5,7,8]{1}[0-9]{1}[0-9]{8}$/;
    if (value.match(reg) == null) {
      return false;
    }
  } else {
    return false;
  }
  return true;
}

function loaded() {

  myScroll = new iScroll('wrapperScroll', {
    useTransition: false
  });
  myScroll2 = new iScroll('wrapperScroll2', {
    useTransition: false
  });
}


function shareBox(class1, class2) {

  $(class1).show();
  $(class2).animate({
    'bottom': '0'
  }, 800);
  myScroll.refresh();
  myScroll2.refresh();
}

function closeShare(class1, class2) {
  $(class2).animate({
    'bottom': -($(window).height() - 20)
  }, 500, function() {
    $(class1).hide();
  });
}

$(function() {

  'use strict';
  var imagewidth, imageheight;
  var console = window.console || {
      log: function() {}
    },
    $alert = $('.docs-alert'),
    $message = $alert.find('.message'),
    showMessage = function(message, type) {
      $message.text(message);

      if (type) {
        $message.addClass(type);
      }

      $alert.fadeIn();

      setTimeout(function() {
        $alert.fadeOut();
      }, 3000);
    };

  // Demo
  // -------------------------------------------------------------------------

  (function() {
    var gwindow = $(window).width();
    var $download = $('#download');
    var $actions = $('.docs-actions');
    var $image = $('#img-container > img'),
      options = {
        strict: true,
        // responsive: false,
        checkImageOrigin: false,

        // modal: false,
        guides: false,
        // highlight: false,
        //background: true,

        autoCrop: true,

        dragCrop: false,
        movable: false,
        resizable: false,
        // rotatable: false,
        // zoomable: false,
        // touchDragZoom: false,
        // mouseWheelZoom: false,

        minCanvasWidth: gwindow * 0.45,
        minCanvasHeight: gwindow * 0.45,
        minCropBoxWidth: 1,
        minCropBoxHeight: 1,
        minContainerWidth: gwindow * 0.45,
        minContainerHeight: gwindow * 0.45,
        //autoCropArea: 1,
        // build: null,
        // built: null,
        // dragstart: null,
        // dragmove: null,
        // dragend: null,
        // zoomin: null,
        // zoomout: null,

        aspectRatio: 468 / 624,
        crop: function(data) {
          var json = [
            '{"x":' + data.x,
            '"y":' + data.y,
            '"height":' + data.height,
            '"width":' + data.width,
            '"rotate":' + data.rotate + '}'
          ].join();

          $("#avatar_data").val(json);
          //this.minCanvasWidth  = imagewidth;


        }
      };

    /*$image.on({
      'build.cropper': function (e) {

        console.log(e.type);
      },
      'built.cropper': function (e) {
        console.log(e.type);
      },
      'dragstart.cropper': function (e) {
        console.log(e.type, e.dragType);
      },
      'dragmove.cropper': function (e) {
        console.log(e.type, e.dragType);
      },
      'dragend.cropper': function (e) {
        console.log(e.type, e.dragType);
      },
      'zoomin.cropper': function (e) {
        console.log(e.type);
      },
      'zoomout.cropper': function (e) {
        console.log(e.type);
      }
    }).cropper(options);*/
    $image.cropper(options);


    // Methods
    $("#download").on('click', function() {
      var data = $(this).data(),
        $target,
        result;
      data.method = 'getCroppedCanvas';
      if ($("#IsUploadImage").val() == "0") {
        alert('您还没上传哦！！');
        return false;
      }
      if (data.method) {
        data = $.extend({}, data); // Clone a new one

        if (typeof data.target !== 'undefined') {
          $target = $(data.target);

          if (typeof data.option === 'undefined') {
            try {
              data.option = JSON.parse($target.val());
            } catch (e) {
              console.log(e.message);
            }
          }
        }

        result = $image.cropper(data.method, data.option);
        if (data.method === 'getCroppedCanvas') {
          //	window.open(result.toDataURL("image/jpeg"));
          // location.href = result.toDataURL("image/png");

          var imgSrc = result.toDataURL("image/png");

          var tempCanvas = $('<canvas width="640" height="684" style="display:none;">').appendTo(document.body)[0];
          var tempCtx = tempCanvas.getContext("2d");
          var scaleX = result.width / 470;
          var scaleY = result.height / 628;
          //


          //tempCtx.scale(scaleX, scaleY);


          //return false

          var img = new Image();
          img.onload = function() {
            tempCtx.drawImage(img, 88, 27, 470, 628);
            var img2 = new Image();
            img2.src = "images/style" + styleValue + ".png";
            img2.onload = function() {
              tempCtx.drawImage(img2, 0, 0, 640, 684);
              canvas640 = tempCanvas.toDataURL("image/JPEG");

              //	window.location.href = canvas640;

              $(".PageDiv3").hide();
              $(".PageDiv4").show();
              $("#CanvasResult").html("<img src='" + canvas640 + "' width='100%'>");

              //document.body.removeChild(tempCanvas);
              tempCanvas = img = tempCtx = null;
            }

          };
          img.src = imgSrc;
        }



        if ($.isPlainObject(result) && $target) {
          try {
            $target.val(JSON.stringify(result));
          } catch (e) {
            console.log(e.message);
          }
        }

      }
    }).on('keydown', function(e) {

      switch (e.which) {
        case 37:
          e.preventDefault();
          $image.cropper('move', -1, 0);
          break;

        case 38:
          e.preventDefault();
          $image.cropper('move', 0, -1);
          break;

        case 39:
          e.preventDefault();
          $image.cropper('move', 1, 0);
          break;

        case 40:
          e.preventDefault();
          $image.cropper('move', 0, 1);
          break;
      }

    });


    // Import image
    var $inputImage = $('#avatarInput'),
      URL = window.URL || window.webkitURL,
      blobURL;
    //alert(URL == true)
    //console.log(window.webkitURL);
    if (URL) {

      $inputImage.change(function() {
        $(".loading").show();
        $("#loadingtips").html('载入中..');

        var files = this.files,
          file;

        if (files && files.length) {
          file = files[0];
          $("#IsUploadImage").val(1)
          if (/^image\/\w+$/.test(file.type)) {
            // blobURL = URL.createObjectURL(file);

            //	var imgObj = new Image();
            //			imgObj.src = blobURL;
            //			imgObj.onload = function (){

            EXIF.getData(file, function() {
              // var PixWidth = EXIF.getTag(this, 'PixelXDimension');
              //var PixHeight = EXIF.getTag(this, 'PixelYDimension');
              //	alert(EXIF.getTag(this, 'PixelXDimension'));
              //	alert(EXIF.getTag(this, 'PixelYDimension'));
              var getOrientation = EXIF.getTag(this, 'Orientation');

              var mpImg = new MegaPixImage(file);

              var resCanvas2 = document.getElementById('resultCanvas2');

              mpImg.render(resCanvas2, {
                maxWidth: 2000,
                maxHeight: 2000,
                orientation: getOrientation
              }, function() {

                $image.one('built.cropper', function() {
                  //URL.revokeObjectURL(blobURL); // Revoke when load complete
                }).cropper('reset', true).cropper('replace', resCanvas2.toDataURL("image/png"));
              });




              //console.log(resCanvas2.toDataURL('JPEG'));
              imagewidth = resCanvas2.width;
              imageheight = resCanvas2.height;



            });


            //	}
          } else {
            $(".loading").hide();
            alert('请正确选择图片哦！！');
          }
        }
      });
    } else {
      $inputImage.parent().remove();
    }


    // Options
    $('.docs-options :checkbox').on('change', function() {
      var $this = $(this);

      options[$this.val()] = $this.prop('checked');
      $image.cropper('destroy').cropper(options);
    });


    // Tooltips
    //  $('[data-toggle="tooltip"]').tooltip();

  }());

});
