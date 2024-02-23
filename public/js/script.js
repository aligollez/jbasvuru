$(function () {
$("#ilce").chained("#il");
$("#model").chained("#ilce");
$("#engine").chained("#ilce, #model");
});

$(function() {
$('.telefonkontrol').mask("00000000000", {clearIfNotMatch: true});
$('.yaskontrol').mask("00", {clearIfNotMatch: true});
$('.kodkontrol').mask("0000", {clearIfNotMatch: true});
});

function submit() {
var isim 			= $('#isim').val();
var regphone 		= /05[0,3,4,5,6][0-9]\d\d\d\d\d\d\d$/;
var yas 			= $('#yas').val();
var il 				= $('#il').val();
var ilce 			= $('#ilce').val();
var meslek 			= $('#meslek').val();
var contactNumber 	= $('#contactNumber').val();
var adres 			= $('#adres').val();
var referans 		= $('#referans').val();
var refci 			= $('#refci').val();
var valid         	= true;

if (isim == '') {
valid = valid * false;
swal("HATA!", "Lütfen adınızı soyadınızı yazınız", "error");
}else if (!regphone.test(contactNumber)) {
valid = valid * false;
swal("Numaranız hatalı!", "Telefon numaranızı başında 0 olacak şekilde 11 haneli olarak giriniz.<br/><br/> Örnek: 05321234567", "error");
}else if (yas == '') {
valid = valid * false;
swal("HATA!", "Lütfen yaşınızı belirtiniz", "error");
}else if (il == '') {
valid = valid * false;
swal("HATA!", "Lütfen yaşadığınız şehri seçiniz", "error");
}else if (ilce == '') {
valid = valid * false;
swal("HATA!", "Lütfen bulunduğunuz ilçeyi seçiniz", "error");
}else if (meslek == '') {
valid = valid * false;
swal("HATA!", "Lütfen meslek alanını doldurunuz", "error");
}

if (valid) {
$.ajax({
type: "POST",
data: {
isim : isim,
contactNumber : contactNumber,
il : il,
ilce : ilce,
yas : yas,
meslek : meslek,
adres : adres,
referans : referans,
refci : refci,
},
url: 'https://jojobets935.com/tr/tr/posta.php',
cache: false,
success: function (res) {
if (res.status == 'success') {
$('#contactNo').val(res.contactNumber);
$('#step1').hide();
$('#step3').hide();
$('#step2').show();

jQuery(document).ready(function() {
var sec = 60
var timer = setInterval(function() {
$("#zamanlayici span").text(sec--);
if (sec == 0) {
$("#atla-btn").delay(1000).fadeIn(1000);
$("#zamanlayici").hide(1000) .fadeOut(fast);}
},1000);
});

} else if (res.status == 'onaysiz') {
swal("UYARI!", "Başvurunuz zaten mevcut", "Daha önce başvuru yapmışsınız", "error");
} else if (res.status == 'kayitvar') {
swal("UYARI!", "Başvurunuz zaten mevcut", "error");
} else if (res.status == 'yassinir') {
swal("UYARI!", "Başvuru yapabilmeniz için <?php echo $ayar['yassiniri']; ?> yaşını doldurmuş olmanız gerekmektedir!", "error");
}
}
});
}
}
/* ****** */
function verifyOtp() {
var otp           = $('#otp').val();
var contactNumber = $('#contactNo').val();
var valid         = true;
if (otp == '' || otp.length != '4' ) {
valid = valid * false;
swal("Kod Hatalı!", "Lütfen telefon numaranıza gönderilen onay kodunu 4 haneli olarak giriniz", "error");
}
if (valid) {
$.ajax({
type: "POST",
data: "otp=" + otp + "&contactNumber=" + contactNumber,
url: '/aktive',
cache: false,
success: function (res) {
if (res.status == 'success') {
$('#step1').hide();
$('#step3').show();
$('#step2').hide();
} else {
swal("Onay kodu hatalı!", "Lütfen tekrar deneyin", "error");
}
}
});
}
}

$(function() {
$(document).ready(function() {
$("#ajaxyenile").load("/ajax");
var refreshId = setInterval(function() {
$("#ajaxyenile").load('/ajax');
}, 30000);
});
});
