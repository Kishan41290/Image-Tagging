$(document).ready(function(){
    $(".loading-div").show(); //show loading element
    $('#more').hide();

    var userid = "39317227";
    var token = "39317227.1677ed0.3d94f4df187947c390d21268ce574b7f";
    var nextURL = "https://api.instagram.com/v1/users/"+userid+"/media/recent?count=250&access_token="+token;

    var currentPage = 0;
    var pages = new Array();
    var img_no = 0;

    requestInstagram();

    function previousPage() {
        currentPage = (currentPage>0) ? currentPage-1 : 0;
        // show photos of currentPage
        console.log("Page " + currentPage);
        console.log("First photo:" + pages[currentPage][0].id);
    }

    function nextPage() {
        if(currentPage!=pages.length)
        {
            if (++currentPage < pages.length) {
                $('#more').hide();
                // show photos of currentPage
                console.log("Page " + currentPage);
                console.log("First photo:" + pages[currentPage][0].id);
            } else {
                requestInstagram();
            }
        }else{
            $("html, body").animate({ scrollTop: 0 });
            $('#more').hide();
            $(".loading-div").hide();
        }
    }

    function requestInstagram() {
        $("html, body").animate({ scrollTop: $(document).height() }, 3000);
        $.ajax({
            method: "GET",
            url: nextURL ,
            dataType: "jsonp",
            context: this,
            success: function (r) {
                if (r.meta.code == "200") {
                    for(var i = 0; i <= 32; i++)
                    {
                        if($.inArray('"'+img_no+'_'+userid+'"', img_arr) !== -1){
                            $("#img-list").append("<li class='img-show1 animated fadeIn' id='data-" + img_no + "'><span><img class='img-show' src='" + r.data[i].images.low_resolution.url + "' width='200px' height='200px'></img></span><span class='visible-chek'><input type='checkbox' name='chk_visible' id='img-visible" + img_no + "' class='img-visible' value='1' checked ><label class='lbl-img-visible' for='img-visible" + img_no + "'>Visible</label></span></li>");
                        }else{
                            $("#img-list").append("<li class='img-show1 animated fadeIn' id='data-" + img_no + "'><span><img class='img-show' src='" + r.data[i].images.low_resolution.url + "' width='200px' height='200px'></img></span><span class='visible-chek'><input type='checkbox' name='chk_visible' id='img-visible" + img_no + "' class='img-visible' value='1' ><label class='lbl-img-visible' for='img-visible" + img_no + "'>Visible</label></span></li>");
                        }
                        img_no = parseInt(img_no) + parseInt(1);
                    }
                    $("#more").show();
                    $(".loading-div").hide(); //once done, hide loading element
                    pages[pages.length] = r.data;
                    $('#hdn-img-val').val(currentPage);
                    nextURL = r.pagination.next_url; // you should implement a way to identify the last page
                }
            }
        });
    }

    $("body").on( "click", "#more", function (e){
        nextPage();
    });

    $('.savechanges').click(function () {
        $('.modal').modal('hide');
    });

    // $('#img-list').DataTable({"pageLength": 20});

    $("body").on("click", ".img-show", function(e) {
        e.preventDefault();
        var id = $(this).closest('li').attr('id').replace('data-','');
        var img = $(this).closest('li').find('img').attr('src');
        // get the tag list for boxes
        $.ajax({
            type: "POST",
            url: "picture.php",
            data : { pic_id : id, img_val : img },
            success: function(data){
                viewtag(id);
                $('.modal').modal('show');
                $('#tagbox').html(data);
            }
        });

    });

    var counter = 0;
    var mouseX = 0;
    var mouseY = 0;

    $('body').on('click', '#imgtag img', function(e) {
        var imgtag = $(this).parent(); // get the div to append the tagging list
        mouseX = e.pageX - $(imgtag).offset().left; // x and y axis
        mouseY = e.pageY - $(imgtag).offset().top;
        $('#tagit').remove(); // remove any tagit div first
        $(imgtag).append('<div id="tagit"><div class="box"></div><div class="name"><input type="text" style="width: 120px" id="pro_val" list="products" placeholder="Select Product"><datalist id="products"></datalist><input class="save-btn" type="button" name="btnsave" value="Save" id="btnsave"  />  <input class="cencel-btn" type="button" name="btncancel" value="Cancel" id="btncancel" /></div></div>');
        $('#pro_val').focus();
        var option = '';
        for (var i=0;i<pro_list.length;i++){
            option += '<option value="'+ pro_list[i]['Name'] + '">' + pro_list[i]['Name'] + '</option>';
        }
        $('#products').append(option);

        $('#tagit').css({top:mouseY,left:mouseX});
        $('#products').focus();
    });


    $('body').on('click', '#btnsave', function() {
        save();
    });

    function save() {
        var name = $('#pro_val').val();
        if (name != '') {
            $.ajax({
                type: "POST",
                url: "savetag.php",
                data: "user_id=" + userid +"&name=" + name + "&pic_id=" + pic_id + "&pic_x=" + mouseX + "&pic_y=" + mouseY + "&type=insert",
                success: function (data) {
                    $('#tagit').fadeOut();
                    viewtag(pic_id);
                }
            });
        } else {
            $('#pro_val').focus().css('border-color', 'red');
            return false;
        }

    }



    $('body').on('click', '#tagit #btncancel', function() {
        $('#tagit').fadeOut();
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

    $('body').on('click', '.taglist li a.remove', function() {
        //  var a = confirm("Are you sure you want to remove this tag?");
        //  if (a) {
        id = $(this).parent().attr("rel");
        // get all tag on page load
        $.ajax({
            type: "POST",
            url: "savetag.php",
            data: "user_id="+userid+"&tag_id=" + id + "&type=remove",
            cache: true,
            success: function (data) {
                viewtag(pic_id);
            }
        });
        //  }

    });

    $('body').on('click', '.img-visible', function() {
        $('.script-msg').show();
        $('.inserted, .updated').fadeOut();
            var picid = $(this).closest('li').attr('id').replace('data-', '');
            var img = $(this).closest('span').prev('span').find('img').attr('src');
            if ($(this).is(':checked')) {
                $.ajax({
                    type: "POST",
                    url: "visibleimg.php",
                    data: "user_id="+userid+"&name=&pic_id="+picid+"&img="+img+"&type=insert",
                    success: function (data) {
                        $("html, body").animate({ scrollTop: 0 }, 600);
                        $('.script-msg').hide();
                        $('.inserted').fadeIn();
                        setTimeout(function(){
                            $('.inserted').fadeOut();
                        }, 4000);
                     }
                });
            } else {

                $.ajax({
                    type: "POST",
                    url: "visibleimg.php",
                    data: "user_id="+userid+"&name=&pic_id="+picid+"&img="+img+"&type=remove",
                    success: function (data) {
                        $("html, body").animate({ scrollTop: 0 }, 600);
                        $('.script-msg').hide();
                        $('.updated').fadeIn();
                        setTimeout(function(){
                            $('.updated').fadeOut();
                        }, 4000);
                    }
                });

            }

    });


    function viewtag(pic_id)
    {
        $.ajax({
            type: "POST",
            url: "savetag.php",
            data: "user_id="+userid+"&name=&pic_id="+pic_id+"&pic_x=&pic_y=&type=",
            cache: true,
            success: function(data){
                $('.taglist ol').html(data);
            }
        });
        // get the tag list for boxes
        $.ajax({
            type: "POST",
            url: "taglist.php",
            data: "user_id="+userid+"&name=&pic_id="+pic_id+"&pic_x=&pic_y=&type=",
            cache: true,
            success: function(data){
                $('.tagbox').html(data);
            }
        });
    }

});


