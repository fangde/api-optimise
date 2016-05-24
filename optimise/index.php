<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="language" content="en"/>
<!--    <base href="/wikihealth/optimise/">-->
    <title>Wiki-Health OPTIMISE</title>

    <!--    <link type="text/css" href="/assets/ui-redmond/jquery-ui-1.8.21.custom.css" rel="Stylesheet" />-->
    <link type="text/css" href="css/site.css" rel="Stylesheet"/>

    <script type="text/javascript" src="js/vendor/jquery-2.1.4.min.js"></script>
    <script type="text/javascript" src="js/vendor/angular.min.js"></script>
<!--    <script type="text/javascript" src="plugins/Chart.min.js"></script>-->
<!--    <script type="text/javascript" src="plugins/angular-chart.min.js"></script>-->
    <script type="text/javascript" src="js/vendor/angular-animate.min.js"></script>
    <script type="text/javascript" src="js/vendor/angular-aria.min.js"></script>
    <script type="text/javascript" src="js/vendor/angular-resource.min.js"></script>
    <script type="text/javascript" src="js/vendor/angular-route.min.js"></script>
    <script type="text/javascript" src="js/vendor/angular-messages.min.js"></script>
    <script type="text/javascript" src="js/vendor/angular-sanitize.min.js"></script>
    <script type="text/javascript" src="js/vendor/angular-cookies.min.js"></script>
    <script type="text/javascript" src="js/vendor/angular-loader.min.js"></script>
    <script type="text/javascript" src="js/vendor/angular-touch.min.js"></script>
    <script type="text/javascript" src="js/vendor/ui-bootstrap-tpls-0.13.2.min.js"></script>
    <script type="text/javascript" src="js/vendor/angular-spinners.min.js"></script>
    <script type="text/javascript" src="js/vendor/d3.min.js"></script>
    <script src="plugins/highcharts.js"></script>
    <script src="http://code.highcharts.com/adapters/standalone-framework.js"></script>
    <script src="plugins/highcharts-ng.min.js"></script>
<!--    <script src="plugins/d3.min.js"></script>-->
<!--    <script src="plugins/nv.d3.min.js"></script>-->
<!--    <script src="plugins/angularjs-nvd3-directives.min.js"></script>-->
    <link rel="stylesheet" href="plugins/nv.d3.min.css"/>


    <link type="text/css" href="css/site.css" rel="Stylesheet"/>


    <script type="text/javascript" src="js/whModule.js"></script>
    <script type="text/javascript" src="js/whModuleRouting.js"></script>

    <script type="text/javascript" src="js/configs.js"></script>
    <script type="text/javascript" src="js/RequestFactory.js"></script>
    <script type="text/javascript" src="js/UserController.js"></script>
    <script type="text/javascript" src="js/QSController.js"></script>
    <script type="text/javascript" src="js/timeline.module.js"></script>
    <script type="text/javascript" src="js/view.module.js"></script>
    <script type="text/javascript" src="js/vas-scale.js"></script>
    <script type="text/javascript" src="js/SignupController.js"></script>
    <script type="text/javascript" src="js/surveys/qs-msqol54.js"></script>
    <script type="text/javascript" src="js/surveys/qs-PROMIS.js"></script>
    <script type="text/javascript" src="js/surveys/qs-qol.js"></script>
    <script type="text/javascript" src="js/DiaryController.js"></script>
    <script type="text/javascript" src="js/vendor/rzslider.min.js"></script>
    <script type="text/javascript" src="plugins/smilies/angular-smilies.min.js"></script>
    <style>


    </style>

<!--    <script src="http://www.amcharts.com/lib/3/amcharts.js"></script>
    <script src="http://www.amcharts.com/lib/3/serial.js"></script>
    <script src="http://www.amcharts.com/lib/3/themes/light.js"></script>-->
<!--    <script type="text/javascript" src="plugins/angular-chart.js"></script>-->
<!--    <script type="text/javascript" src="plugins/angular-chart.min.js.map"></script>-->
<!--    <link type="text/css" href=plugins/angular-chart.css rel="Stylesheet"/>-->
    <link type="text/css" href=css/proms.css rel="Stylesheet"/>
    <link type="text/css" href=css/rzslider.css rel="Stylesheet"/>
    <link type="text/css" href=css/bootstrap.min.css rel="Stylesheet"/>
    <link type="text/css" href=css/timeline.css rel="Stylesheet"/>

    <link type="text/css" href=plugins/smilies/angular-smilies-embed.min.css rel="Stylesheet"/>

    <!--    <link type="text/css" href=/data-management-portal/css/main.css rel="Stylesheet" />-->
    <!--    <script type="text/javascript" src="/assets/js/mustache.js"></script>-->
    <!--    <script type="text/javascript" src="/assets/js/moment.min.js"></script>-->
    <script>
        $(document).ready(function () {
            $("#txtSettings a").click(function () {
                $('body').css("zoom", this.id + "%");
            });
        });
    </script>

</head>

<body ng-app="wh">
<spinner name="Spinner" class="modal-spinner" img-src="img/loader.gif"><br>Loading...</spinner>

<div class="wrapper">
    <div class="inner_wrapper">
        <div class="row" ng-controller="UserController" data-ng-init="init()">
            <div class="pull-right" style="" ng-hide="isLoggedIn">
                <div style="display:none" id="login-alert" class="alert alert-danger"></div>
                <form id="loginform" class="form-inline" role="form" ng-enter="getToken()">
                    <div class="input-group col-sm-6">
                        <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                        <input id="login-username" type="text" class="form-control" ng-model="username" name="username" value=""
                               placeholder="username">
                        <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                        <input id="login-password" type="password" class="form-control" ng-model="password" name="password"
                               placeholder="password">
                    </div>
                    <a id="btn-login" href="" class="btn btn-success" ng-click="getToken()">LOGIN</a>
                    <a id="btn-fblogin" href="" class="btn btn-primary" ng-click="joinNow()">JOIN NOW</a>
                    <div class="col-sm-1"></div>
                    </form>
            </div>
            <div style="" ng-show="isLoggedIn">
                <div class="row pull-right">

                   <div class="col-sm-6 row " style="text-align: right"><div class="col-sm-12"> WELCOME BACK Leon</div><div class="col-sm-12"> <a href="" ng-click="manageMyAccount();">Manage Account></a></div></div>
                   <div class="col-sm-2 " style="text-align: right"> <a id="btn-login" href="" class="btn btn-warning" ng-click="logoff()">LOG OUT</a></div>
                </div>
            </div>

<!--            <div class="col-sm-pull-5"></div>-->

            <!-- <div class="col-sm-6">
                 <div class="row">
                <span class="">
                       <input id="login-remember" type="checkbox" name="remember" value="1"> Remember me
                   </span>
                     </div>
                 <div class="row">
                 <span><a href="#">Forgot password</a> </span>
                 </div>
             </div>-->


        </div>
    </div>
    <div class="header" ng-controller="navigationController">
        <div class="inner_wrapper">
            <a href="" id="logo"></a>
            <ul class="top_menu">
                <li class="alpha"><a href=""></a></li>
                <!--                <li class=""><a href="/about/overview.php">About</li> ng-click="viewService.setView('Timeline')-->
                <li  ng-class="{active: viewService.getView().Section=='Surveys'}"><a href="#surveys" ng-click="viewService.setView('Surveys')">My Health Surveys</a></li>
                <li ng-class="{active: viewService.getView().Section=='Timeline'}"><a href="#timeline" ng-click="viewService.setView('Timeline')">My Timeline</a></li>
                <li ng-class="{active: viewService.getView().Section=='Diary'}"><a href="#diary" ng-click="viewService.setView('Diary')">My Diary</a></li>

                <li><a href="">My Diary</a></li>

                <li class=""><a href="">Helpful Links</a>
                    <ul>
                        <li><a target="_blank" href="http://www.mssociety.org.uk/">Multiple Sclerosis Society UK</a></li>
                        <li><a target="_blank" href="http://www.mstrust.org.uk/">Multiple Sclerosis Trust UK</a></li>
                        <li><a target="_blank" href="http://www.ms-research.org.uk/">MS Research Charity</a></li>
                        <li><a target="_blank" href="https://www.iconquerms.org">iConquerMS.org</a></li>
                    </ul>
                </li>
                <li class=""><a href="">About</a>
                    <ul>
                        <li><a href="">Why Wiki-Health for OPTIMISE</a></li>
                        <li><a href="">Contact Us</a></li>
                    </ul>
                </li>
            </ul>


            <div class="text-setting">
                <div id="txtSettings" class="text-size">
                    <span>Need to increase text size?</span>
                    <a style="font-size:14px;" id="100" href="javascript:void(0);">a</a>
                    <a style="font-size:16px;" id="125" href="javascript:void(0);">a</a>
                    <a style="font-size:18px;" id="150" href="javascript:void(0);">a</a>
                    <a style="font-size:20px;" id="175" href="javascript:void(0);">a</a>
                </div>
            </div>
        </div>
    </div>
    <!--End Header-->

    <div class="main" >
        <div class="inner_wrapper">
            <div class="padding10" style="min-height: 200px">
                <ng-view></ng-view>

<!--                <div id="timeline" timeline-entry ng-controller="timelineCtrl" data-ng-init="getAllData()" ></div>-->
            </div>
        </div>
        <!--End Main-->

        <div class="clear"></div>
        <div class="footer">
            <div class="footer_item " style="text-align: center;color:#fff;">Copyright 2015 www.wiki-health.org. All
                Rights Reserved.
            </div>
        </div>
        <!--End Footer-->
    </div>
    <script type="text/javascript">

        var _gaq = _gaq || [];
        _gaq.push(['_setAccount', 'UA-40468416-1']);
        _gaq.push(['_trackPageview']);

        (function () {
            var ga = document.createElement('script');
            ga.type = 'text/javascript';
            ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(ga, s);
        })();

    </script>
</body>
</html>