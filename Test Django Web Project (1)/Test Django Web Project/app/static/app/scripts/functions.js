
//点击添加按钮创建出新的box
+function ($) {
  // $(function (){
  //   $('.btn-add').on('click',function(){
  //     var html="<div class='col-sm-6 col-xs-12'><div class='box box1'><div class='box-header clearf'><div class='title col-xs-3'>title</div><ul class='fr'><a href='#' class='col-xs-1 changeCol'><span class='fa fa-pencil'></span></a><a href='#' class='col-xs-1 move'><span class='fa fa-th-large'></span></a><a href='#' class='col-xs-1 trash trash1'><span class='fa fa-trash'></span></a></ul></div><div class='clearf'><li class='col-xs-3'><div class='heading'>Choose date</div></li><li class='col-xs-4'><div class='form-group has-icon'><input type='month' name='' value=''></div></li></div></div></div>";
  //     $('#box-add').parent().before(html);
  //   });
  // });

  $(function (){
    $('#add1').on('click',function(){
      var html="<div class='col-sm-6 col-xs-12'><div class='box box1'><div class='box-header clearf'><div class='title col-xs-3'>title</div><ul class='fr'><a href='#' class='col-xs-1 changeCol'><span class='fa fa-pencil'></span></a><a href='#' class='col-xs-1 move'><span class='fa fa-th-large'></span></a><a href='#' class='col-xs-1 trash trash1'><span class='fa fa-trash'></span></a></ul></div><div class='clearf'><li class='col-xs-3'><div class='heading'>Choose date</div></li><li class='col-xs-4'><div class='form-group has-icon'><input type='month' name='' value=''></div></li></div></div></div>";
      $('#box-add').parent().before(html);
      $('.box1').append("<div id='chart1D'></div>");
      drawchart1D();
    });
  });
  $(function (){
    $('#add2').on('click',function(){
      var html="<div class='col-sm-6 col-xs-12'><div class='box box2'><div class='box-header clearf'><div class='title col-xs-3'>title</div><ul class='fr'><a href='#' class='col-xs-1 changeCol'><span class='fa fa-pencil'></span></a><a href='#' class='col-xs-1 move'><span class='fa fa-th-large'></span></a><a href='#' class='col-xs-1 trash trash1'><span class='fa fa-trash'></span></a></ul></div><div class='clearf'><li class='col-xs-3'><div class='heading'>Choose date</div></li><li class='col-xs-4'><div class='form-group has-icon'><input type='month' name='' value=''></div></li></div></div></div>";
      $('#box-add').parent().before(html);
      $('.box2').append("<div id='chart1W'></div>");
      drawchart1W();
    });
  });
  $(function (){
    $('#add3').on('click',function(){
      var html="<div class='col-sm-6 col-xs-12'><div class='box box3'><div class='box-header clearf'><div class='title col-xs-3'>title</div><ul class='fr'><a href='#' class='col-xs-1 changeCol'><span class='fa fa-pencil'></span></a><a href='#' class='col-xs-1 move'><span class='fa fa-th-large'></span></a><a href='#' class='col-xs-1 trash trash1'><span class='fa fa-trash'></span></a></ul></div><div class='clearf'><li class='col-xs-3'><div class='heading'>Choose date</div></li><li class='col-xs-4'><div class='form-group has-icon'><input type='month' name='' value=''></div></li></div></div></div>";
      $('#box-add').parent().before(html);
      $('.box3').append("<div id='chart1M'></div>");
      drawchart1M();
    });
  });
  // $(function(){
  //   $('#add1').on('click', function(){
  //     $('.box1').append("<div id='chart1D'></div>");
  //     drawchart1D();
  //   });
  // });
  // $(function(){
  //   $('#add2').on('click', function(){
  //     $('.box1').append("<div id='chart1W'></div>");
  //     drawchart1W();
  //   });
  // });
  // $(function(){
  //   $('#add3').on('click', function(){
  //     $('.box1').append("<div id='chart1M'></div>");
  //     drawchart1M();
  //   });
  // });
  // $(function(){
  //   $('#test').click(function(){
  //     $('.box2').append("<div id='chart1D'></div>");
  //   });
  // });


  //"设置"按钮
  $(function () {
    $('#setting').on('click', function () {
      if ($('#box-add').parent().hasClass('myhide')) {
        $('.box-header').removeClass('hidden');
        $('#box-add').parent().removeClass('myhide');
      } else {
        $('.box-header').addClass('hidden');
        $('#box-add').parent().addClass('myhide');
      }
    });
  });
  // $(function(){
  //   $('#setting').on('click', function(){
  //     $('#box-add').parent().toggle();
  //     $('.box-header').toggle();
  //     $('#box-add').parent().removeClass('hide');
  //     $('.box-header').removeClass('hidden');
  //   });
  // })
  //mobile ‘设置’按钮
  // $(function () {
  //   $('#setting-top').on('click', function () {
  //     if ($('.box-header').hasClass('hidden')) {
  //       $('.box-header').removeClass('hidden');
  //       $('#box-add').removeClass('hidden');
  //     } else {
  //       $('.box-header').addClass('hidden');
  //       $('#box-add').addClass('hidden');
  //     }
  //   });
  // });
  $(function(){
    $('#setting-top').on('click', function(){
      $('#box-add').toggle();
      $('.box-header').toggle();
      $('#box-add').removeClass('hidden');
      $('.box-header').removeClass('hidden');
    });
  })
  //“添加”按钮 出现model界面
  $(function () {
    $('.box-add').on('click', function () {
        $('#model').removeClass('hidden');
    });
  });
  //“添加” 创建新box
  $(function () {
    $('.btn-add').on('click', function () {
        $('#model').addClass('hidden');
    });
  });
  //admin 按钮
  $(function () {
    $('#admin').on('click', function () {
      if ($('#setting').hasClass('hidden')) {
        $('#setting').removeClass('hidden');
      } else {
        $('#setting').addClass('hidden');
        $('.box-header').addClass('hidden');
        $('#box-add').addClass('hidden');
      }
    });
  });

  //删除
  $(function () {
    $('.trash').on('click', function(){
      $(this).parent().parent().parent().parent().remove();
    });
    $(document).on('click', '.trash1', function(){
      $(this).parent().parent().parent().parent().remove();
    });
  });
  $(function () {
    $('.delete').on('click', function(){
      $(this).parent().parent().addClass('hidden');
    });
  });
  // $(function(){
  //   $('#test').on('click', function(){
  //     drawchart1D();
  //   })
  // })

}(jQuery);
