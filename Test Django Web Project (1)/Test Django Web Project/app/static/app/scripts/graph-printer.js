
function drawchart1(){
  var linechart = echarts.init(document.getElementById('chart1'));

  option = {
    color: ['#3398DB'],
    tooltip : {
      trigger: 'axis',
      axisPointer : {
        type : 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis : [
      {
        type : 'category',
        data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis : [
      {
        type : 'value'
      }
    ],
    series : [
      {
        name:'直接访问',
        type:'bar',
        barWidth: '60%',
        data:[100, 52, 200, 334, 390, 330, 220]
      }
    ]
  };
  linechart.setOption(option);
}

function drawchartRank(){
  var linechart = echarts.init(document.getElementById('chartRank'));
  option = {
      tooltip : {
          trigger: 'axis',
          axisPointer : {
              type : 'shadow'
          }
      },
      legend: {
          data: ['A', 'B','C','D','E']
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
      },
      xAxis:  {
          type: 'value'
      },
      yAxis: {
          type: 'category',
          data: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
      },
      series: [
          {
              name: 'A',
              type: 'bar',
              stack: 'QUALITY',
              label: {
                  normal: {
                      show: true,
                      position: 'insideRight'
                  }
              },
              data: [320, 302, 301, 334, 390, 330, 320]
          },
          {
              name: 'B',
              type: 'bar',
              stack: 'QUALITY',
              label: {
                  normal: {
                      show: true,
                      position: 'insideRight'
                  }
              },
              data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
              name: 'C',
              type: 'bar',
              stack: 'QUALITY',
              label: {
                  normal: {
                      show: true,
                      position: 'insideRight'
                  }
              },
              data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
              name: 'D',
              type: 'bar',
              stack: 'QUALITY',
              label: {
                  normal: {
                      show: true,
                      position: 'insideRight'
                  }
              },
              data: [150, 212, 201, 154, 190, 330, 410]
          },
          {
              name: 'E',
              type: 'bar',
              stack: 'QUALITY',
              label: {
                  normal: {
                      show: true,
                      position: 'insideRight'
                  }
              },
              data: [820, 832, 901, 934, 1290, 1330, 1320]
          }
      ]
  };
  linechart.setOption(option);
}
function drawchart1D(){

  var linechart = echarts.init(document.getElementById('chart1D'));

  var dataAxis = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sta', 'Sun'];
  var data = [220, 182, 191, 234, 290, 330, 310];
  var yMax = 500;
  var dataShadow = [];

  for (var i = 0; i < data.length; i++) {
      dataShadow.push(yMax);
  }

  option = {
      title: {
          text: '',
          subtext: ''
      },
      xAxis: {
          data: dataAxis,
          axisLabel: {
              // inside: true,
              textStyle: {
                  color: '#455565'
              }
          },
          axisTick: {
              show: false
          },
          axisLine: {
              show: false
          },
          z: 10
      },
      yAxis: {
          name: 'Imprints',
          axisLine: {
              show: false
          },
          axisTick: {
              show: false
          },
          axisLabel: {
              textStyle: {
                  color: '#999'
              }
          }
      },
      dataZoom: [
          {
              type: 'inside'
          }
      ],
      series: [
          { // For shadow
              type: 'bar',
              itemStyle: {
                  normal: {color: 'rgba(0,0,0,0.05)'}
              },
              barGap:'-100%',
              barCategoryGap:'40%',
              data: dataShadow,
              animation: false
          },
          {
              type: 'bar',
              itemStyle: {
                  normal: {
                      color: new echarts.graphic.LinearGradient(
                          0, 0, 0, 1,
                          [
                              {offset: 0, color: '#83bff6'},
                              {offset: 0.5, color: '#188df0'},
                              {offset: 1, color: '#188df0'}
                          ]
                      )
                  },
                  emphasis: {
                      color: new echarts.graphic.LinearGradient(
                          0, 0, 0, 1,
                          [
                              {offset: 0, color: '#2378f7'},
                              {offset: 0.7, color: '#2378f7'},
                              {offset: 1, color: '#83bff6'}
                          ]
                      )
                  }
              },
              data: data
          }
      ]
  };
  var zoomSize = 6;
  linechart.on('click', function (params) {
    console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
    linechart.dispatchAction({
        type: 'dataZoom',
        startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
        endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
    });
});
  linechart.setOption(option);
}
function drawchart1W(){

  var linechart = echarts.init(document.getElementById('chart1W'));

  var dataAxis = ['week12', 'week13', 'week14', 'week15', 'week16', 'week17', 'week18', 'week19', 'week20', 'week21', 'week22', 'week23', 'week24'];
  var data = [220, 182, 191, 234, 290, 330, 310, 443, 331, 112, 449, 102, 339];
  var yMax = 500;
  var dataShadow = [];

  for (var i = 0; i < data.length; i++) {
      dataShadow.push(yMax);
  }

  option = {
      title: {
          text: '',
          subtext: ''
      },
      xAxis: {
          data: dataAxis,
          axisLabel: {
              // inside: true,
              textStyle: {
                  color: '#455565'
              }
          },
          axisTick: {
              show: false
          },
          axisLine: {
              show: false
          },
          z: 10
      },
      yAxis: {
          name: 'Imprints',
          axisLine: {
              show: false
          },
          axisTick: {
              show: false
          },
          axisLabel: {
              textStyle: {
                  color: '#999'
              }
          }
      },
      dataZoom: [
          {
              type: 'inside'
          }
      ],
      series: [
          { // For shadow
              type: 'bar',
              itemStyle: {
                  normal: {color: 'rgba(0,0,0,0.05)'}
              },
              barGap:'-100%',
              barCategoryGap:'40%',
              data: dataShadow,
              animation: false
          },
          {
              type: 'bar',
              itemStyle: {
                  normal: {
                      color: new echarts.graphic.LinearGradient(
                          0, 0, 0, 1,
                          [
                              {offset: 0, color: '#83bff6'},
                              {offset: 0.5, color: '#188df0'},
                              {offset: 1, color: '#188df0'}
                          ]
                      )
                  },
                  emphasis: {
                      color: new echarts.graphic.LinearGradient(
                          0, 0, 0, 1,
                          [
                              {offset: 0, color: '#2378f7'},
                              {offset: 0.7, color: '#2378f7'},
                              {offset: 1, color: '#83bff6'}
                          ]
                      )
                  }
              },
              data: data
          }
      ]
  };
  var zoomSize = 6;
  linechart.on('click', function (params) {
    console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
    linechart.dispatchAction({
        type: 'dataZoom',
        startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
        endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
    });
});
  linechart.setOption(option);
}
function drawchart1M(){

  var linechart = echarts.init(document.getElementById('chart1M'));

  var dataAxis = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var data = [500, 332, 291, 134, 2, 30, 210, 443, 431, 212, 149, 222];
  var yMax = 500;
  var dataShadow = [];

  for (var i = 0; i < data.length; i++) {
      dataShadow.push(yMax);
  }

  option = {
      title: {
          text: '',
          subtext: ''
      },
      xAxis: {
          data: dataAxis,
          axisLabel: {
              // inside: true,
              textStyle: {
                  color: '#455565'
              }
          },
          axisTick: {
              show: false
          },
          axisLine: {
              show: false
          },
          z: 10
      },
      yAxis: {
          name: 'Imprints',
          axisLine: {
              show: false
          },
          axisTick: {
              show: false
          },
          axisLabel: {
              textStyle: {
                  color: '#999'
              }
          }
      },
      dataZoom: [
          {
              type: 'inside'
          }
      ],
      series: [
          { // For shadow
              type: 'bar',
              itemStyle: {
                  normal: {color: 'rgba(0,0,0,0.05)'}
              },
              barGap:'-100%',
              barCategoryGap:'40%',
              data: dataShadow,
              animation: false
          },
          {
              type: 'bar',
              itemStyle: {
                  normal: {
                      color: new echarts.graphic.LinearGradient(
                          0, 0, 0, 1,
                          [
                              {offset: 0, color: '#83bff6'},
                              {offset: 0.5, color: '#188df0'},
                              {offset: 1, color: '#188df0'}
                          ]
                      )
                  },
                  emphasis: {
                      color: new echarts.graphic.LinearGradient(
                          0, 0, 0, 1,
                          [
                              {offset: 0, color: '#2378f7'},
                              {offset: 0.7, color: '#2378f7'},
                              {offset: 1, color: '#83bff6'}
                          ]
                      )
                  }
              },
              data: data
          }
      ]
  };
  var zoomSize = 6;
  linechart.on('click', function (params) {
    console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
    linechart.dispatchAction({
        type: 'dataZoom',
        startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
        endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
    });
});
  linechart.setOption(option);
}
function drawchart2D(){

  var linechart = echarts.init(document.getElementById('chart2D'));

  var dataAxis = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sta', 'Sun'];
  var data = [220, 182, 191, 234, 290, 330, 310];
  var yMax = 500;
  var dataShadow = [];

  for (var i = 0; i < data.length; i++) {
      dataShadow.push(yMax);
  }

  option = {
      title: {
          text: '',
          subtext: ''
      },
      xAxis: {
          data: dataAxis,
          axisLabel: {
              // inside: true,
              textStyle: {
                  color: '#455565'
              }
          },
          axisTick: {
              show: false
          },
          axisLine: {
              show: false
          },
          z: 10
      },
      yAxis: {
          name: 'Imprints',
          axisLine: {
              show: false
          },
          axisTick: {
              show: false
          },
          axisLabel: {
              textStyle: {
                  color: '#999'
              }
          }
      },
      dataZoom: [
          {
              type: 'inside'
          }
      ],
      series: [
          { // For shadow
              type: 'bar',
              itemStyle: {
                  normal: {color: 'rgba(0,0,0,0.05)'}
              },
              barGap:'-100%',
              barCategoryGap:'40%',
              data: dataShadow,
              animation: false
          },
          {
              type: 'bar',
              itemStyle: {
                  normal: {
                      color: new echarts.graphic.LinearGradient(
                          0, 0, 0, 1,
                          [
                              {offset: 0, color: '#83bff6'},
                              {offset: 0.5, color: '#188df0'},
                              {offset: 1, color: '#188df0'}
                          ]
                      )
                  },
                  emphasis: {
                      color: new echarts.graphic.LinearGradient(
                          0, 0, 0, 1,
                          [
                              {offset: 0, color: '#2378f7'},
                              {offset: 0.7, color: '#2378f7'},
                              {offset: 1, color: '#83bff6'}
                          ]
                      )
                  }
              },
              data: data
          }
      ]
  };
  var zoomSize = 6;
  linechart.on('click', function (params) {
    console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
    linechart.dispatchAction({
        type: 'dataZoom',
        startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
        endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
    });
});
  linechart.setOption(option);
}
function drawchart2W(){

  var linechart = echarts.init(document.getElementById('chart2W'));

  var dataAxis = ['week12', 'week13', 'week14', 'week15', 'week16', 'week17', 'week18', 'week19', 'week20', 'week21', 'week22', 'week23', 'week24'];
  var data = [220, 182, 191, 234, 290, 330, 310, 443, 331, 112, 449, 102, 339];
  var yMax = 500;
  var dataShadow = [];

  for (var i = 0; i < data.length; i++) {
      dataShadow.push(yMax);
  }

  option = {
      title: {
          text: '',
          subtext: ''
      },
      xAxis: {
          data: dataAxis,
          axisLabel: {
              // inside: true,
              textStyle: {
                  color: '#455565'
              }
          },
          axisTick: {
              show: false
          },
          axisLine: {
              show: false
          },
          z: 10
      },
      yAxis: {
          name: 'Imprints',
          axisLine: {
              show: false
          },
          axisTick: {
              show: false
          },
          axisLabel: {
              textStyle: {
                  color: '#999'
              }
          }
      },
      dataZoom: [
          {
              type: 'inside'
          }
      ],
      series: [
          { // For shadow
              type: 'bar',
              itemStyle: {
                  normal: {color: 'rgba(0,0,0,0.05)'}
              },
              barGap:'-100%',
              barCategoryGap:'40%',
              data: dataShadow,
              animation: false
          },
          {
              type: 'bar',
              itemStyle: {
                  normal: {
                      color: new echarts.graphic.LinearGradient(
                          0, 0, 0, 1,
                          [
                              {offset: 0, color: '#83bff6'},
                              {offset: 0.5, color: '#188df0'},
                              {offset: 1, color: '#188df0'}
                          ]
                      )
                  },
                  emphasis: {
                      color: new echarts.graphic.LinearGradient(
                          0, 0, 0, 1,
                          [
                              {offset: 0, color: '#2378f7'},
                              {offset: 0.7, color: '#2378f7'},
                              {offset: 1, color: '#83bff6'}
                          ]
                      )
                  }
              },
              data: data
          }
      ]
  };
  var zoomSize = 6;
  linechart.on('click', function (params) {
    console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
    linechart.dispatchAction({
        type: 'dataZoom',
        startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
        endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
    });
});
  linechart.setOption(option);
}
function drawchart2M(){

  var linechart = echarts.init(document.getElementById('chart2M'));

  var dataAxis = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var data = [500, 332, 291, 134, 2, 30, 210, 443, 431, 212, 149, 222];
  var yMax = 500;
  var dataShadow = [];

  for (var i = 0; i < data.length; i++) {
      dataShadow.push(yMax);
  }

  option = {
      title: {
          text: '',
          subtext: ''
      },
      xAxis: {
          data: dataAxis,
          axisLabel: {
              // inside: true,
              textStyle: {
                  color: '#455565'
              }
          },
          axisTick: {
              show: false
          },
          axisLine: {
              show: false
          },
          z: 10
      },
      yAxis: {
          name: 'Imprints',
          axisLine: {
              show: false
          },
          axisTick: {
              show: false
          },
          axisLabel: {
              textStyle: {
                  color: '#999'
              }
          }
      },
      dataZoom: [
          {
              type: 'inside'
          }
      ],
      series: [
          { // For shadow
              type: 'bar',
              itemStyle: {
                  normal: {color: 'rgba(0,0,0,0.05)'}
              },
              barGap:'-100%',
              barCategoryGap:'40%',
              data: dataShadow,
              animation: false
          },
          {
              type: 'bar',
              itemStyle: {
                  normal: {
                      color: new echarts.graphic.LinearGradient(
                          0, 0, 0, 1,
                          [
                              {offset: 0, color: '#83bff6'},
                              {offset: 0.5, color: '#188df0'},
                              {offset: 1, color: '#188df0'}
                          ]
                      )
                  },
                  emphasis: {
                      color: new echarts.graphic.LinearGradient(
                          0, 0, 0, 1,
                          [
                              {offset: 0, color: '#2378f7'},
                              {offset: 0.7, color: '#2378f7'},
                              {offset: 1, color: '#83bff6'}
                          ]
                      )
                  }
              },
              data: data
          }
      ]
  };
  var zoomSize = 6;
  linechart.on('click', function (params) {
    console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
    linechart.dispatchAction({
        type: 'dataZoom',
        startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
        endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
    });
});
  linechart.setOption(option);
}

//点击添加按钮创建出新的box
+function ($) {
  $(function (){
    $('.btn-add').on('click',function(){
      var html="<div class='col-sm-6 col-xs-12'><div class='box box1'><div class='box-header clearf'><div class='title col-xs-3'>title</div><ul class='fr'><a href='#' class='col-xs-1 changeCol'><span class='fa fa-pencil'></span></a><a href='#' class='col-xs-1 move'><span class='fa fa-th-large'></span></a><a href='#' class='col-xs-1 trash trash1'><span class='fa fa-trash'></span></a></ul></div><div class='Q&A fr'><ul><a href='#' class='faq hidden'>Q&A<span class='fa fa-question-circle-o'></span></a></ul></div><!-- <div id='chart1M'></div> --></div></div>";
      $('#box-add').parent().before(html);
    });
  });
  //"设置"按钮
  $(function () {
    $('#setting').on('click', function () {
      if ($('.box-header').hasClass('hidden')) {
        $('.box-header').removeClass('hidden');
        $('#box-add').removeClass('hidden');
      } else {
        $('.box-header').addClass('hidden');
        $('#box-add').addClass('hidden');
      }
    });
  });
  //mobile ‘设置’按钮
  $(function () {
    $('#setting-top').on('click', function () {
      if ($('.box-header').hasClass('hidden')) {
        $('.box-header').removeClass('hidden');
        $('#box-add').removeClass('hidden');
      } else {
        $('.box-header').addClass('hidden');
        $('#box-add').addClass('hidden');
      }
    });
  });
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
  //Q&A
  $(function(){
    $('.box').hover(function(){
      $(this).find('.FAQ').removeClass('hidden');},
      function(){
        $(this).find('.FAQ').addClass('hidden')});
    // $(document).on('click', '.box1', function(){
    //   $(this).find('.faq').removeClass('hidden')});
      // function(){
      //   $(this).find('.faq').addClass('hidden')});
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
}(jQuery);
