<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Mentor Education Bootstrap Theme</title>
  <meta name="description" content="Free Bootstrap Theme by BootstrapMade.com">
  <meta name="keywords" content="free website templates, free bootstrap themes, free template, free bootstrap, free website template">

  <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Open+Sans|Candal|Alegreya+Sans">
  <link rel="stylesheet" type="text/css" href="{{asset('theme/css/font-awesome.min.css')}}">
  <link rel="stylesheet" type="text/css" href="{{asset('theme/css/bootstrap.min.css')}}">
  <link rel="stylesheet" type="text/css" href="{{asset('theme/css/imagehover.min.css')}}">
  <link rel="stylesheet" type="text/css" href="{{asset('theme/css/style.css')}}">
  <!-- =======================================================
    Theme Name: Mentor
    Theme URL: https://bootstrapmade.com/mentor-free-education-bootstrap-theme/
    Author: BootstrapMade.com
    Author URL: https://bootstrapmade.com
  ======================================================= -->
</head>

<body>
  <!--Navigation bar-->
  
  <!--/ Navigation bar-->
  <!--Modal box-->

  @include('partial.header')
  <!--/ Modal box-->
  <!--Banner-->
  @yield('content')
  <!--/ Banner-->
  <!--Feature-->
  
  <!--/ feature-->
  <!--Organisations-->
  
  <!--/ Organisations-->
  <!--Cta-->
  
  <!--/ Cta-->
  <!--work-shop-->
  
  <!--/ work-shop-->
  <!--Faculity member-->
 
  <!--/ Faculity member-->
  <!--Testimonial-->
  
  <!--/ Testimonial-->
  <!--Courses-->
  
  <!--/ Courses-->
  <!--Pricing-->
  
  <!--/ Pricing-->
  <!--Contact-->
  
  <!--/ Contact-->
  <!--Footer-->
  @include('partial.footer')
  <!--/ Footer-->

  <script src="{{asset('theme/js/jquery.min.js')}}"></script>
  <script src="{{asset('theme/js/jquery.easing.min.js')}}"></script>
  <script src="{{asset('theme/js/bootstrap.min.js')}}"></script>
  <script src="{{asset('theme/js/custom.js')}}"></script>
  <script src="{{asset('theme/contactform/contactform.js')}}"></script>

</body>

</html>
