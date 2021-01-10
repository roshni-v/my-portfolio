$(document).ready(function() {
                
                var $item = $('div.item'), //Cache your DOM selector
                    visible = 2, //Set the number of items that will be visible
                    index = 0, //Starting index
                    endIndex = ( $item.length / visible ) - 1; //End index
                
                $('div#arrowR').click(function(){
                    if(index < endIndex ){
                      index++;
                      $item.animate({'left':'-=300px'});
                    }
                });
                
                $('div#arrowL').click(function(){
                    if(index > 0){
                      index--;            
                      $item.animate({'left':'+=300px'});
                    }
                });

                const $menu = $('.dropdown');

                $(document).mouseup(e => {
                   if (!$menu.is(e.target) // if the target of the click isn't the container...
                   && $menu.has(e.target).length === 0) // ... nor a descendant of the container
                   {
                     $menu.removeClass('is-active');
                  }
                 });

                $('.toggle').on('click', () => {
                  $menu.toggleClass('is-active');
                });

            });
