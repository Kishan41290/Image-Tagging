$(document).ready(function(){

    $('.savechanges').click(function () {
        $('.modal').modal('hide');
    });

    // $('#img-list').DataTable({"pageLength": 20});

    $("body").on("click", ".img-show", function(e) {
        e.preventDefault();
        var id = $(this).closest('li').attr('id').replace('data-','').split('_');
        var img = $(this).closest('li').find('img').attr('src');
        // get the tag list for boxes
        $.ajax({
            type: "POST",
            url: "picture.php",
            data : { pic_id : id[0], img_val : img },
            success: function(data){
                viewtag(id);
                $('.modal').modal('show');
                $('#tagbox').html(data);
            }
        });

    });

    $('body').on('mouseover mouseout', '.taglist-product li', function() {
        id = $(this).attr("rel");
        if (event.type == "mouseover"){
            $('#view_' + id).css({
                'background' : '#5cb85c',
                'border-color' : '#5cb85c'
            });
        }else{
            $('#view_' + id).css({
                'background' : 'red',
                'border-color' : 'red'
            });
            $('#view_' + id).hide();
        }
    });


    function viewtag(pic_id)
    {
        $.ajax({
            type: "POST",
            url: "savetag.php",
            data: "user_id="+pic_id[1]+"&name=&pic_id="+pic_id[0]+"&pic_x=&pic_y=&type=",
            cache: true,
            success: function(data){
                $('.taglist ol').html(data);
            }
        });
        // get the tag list for boxes
        $.ajax({
            type: "POST",
            url: "taglist.php",
            data: "user_id="+pic_id[1]+"&name=&pic_id="+pic_id[0]+"&pic_x=&pic_y=&type=",
            cache: true,
            success: function(data){
                $('.tagbox').html(data);
            }
        });
    }

});


