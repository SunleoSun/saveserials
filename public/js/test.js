$(function (){
    $( '#test-div' ).hover(function (){
        $( '#test-div' ).addClass('testDivBefore-hover');
    });
    $( '#test-div' ).mouseout(function (){
        $( '#test-div' ).removeClass('testDivBefore-hover');
    });
    $( '#test-div' ).mousedown(function (){
        $( '#test-div' ).addClass('testDiv');
    });
    $( '#test-div' ).mouseup(function (){
        $( '#test-div' ).removeClass('testDiv');
    });
    $('.btn').mousedown(
            function() { $(this).addClass('btn-down');   }
      );
    $('.btn').mouseup(
            function() { $(this).removeClass('btn-down');   }
      );
});

$(window).load(function() {
//    var div = $( '#test-div' );
    
});