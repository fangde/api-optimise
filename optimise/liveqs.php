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


    <!--End Header-->

    <div class="main" >
        <div class="inner_wrapper">
            <div class="padding10" style="min-height: 200px">
            <survey-list></survey-list>

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