/* ANIMATE: Click .point and scroll down to select projects */

$(".point").click(function() {
    $('html,body').animate({
        scrollTop: $("#columns").offset().top},
        'slow');
});

/* Change background when scrolling */
$(function() {
   $(window).scroll(function () {
      if ($(this).scrollTop() > 50) {
         $('html').addClass(‘changeColor’)
      }
      if ($(this).scrollTop() < 50) {
         $('html').removeClass(‘changeColor’)
      }
   });
});


/* tbd below */

/* ANIMATE: Make hover items pop up when hovering over project square */

/* For project1 */ 

function hoverProject1() {
    document.getElementById('project1Hide').classList.remove('hidden');
    document.getElementById('project1').classList.add('hidden');
}

function hoverProject1Out() {
    document.getElementById('project1Hide').classList.add('hidden');
    document.getElementById('project1').classList.remove('hidden');
}

document.getElementById('project1').onmouseover = hoverProject1;

document.getElementById('project1').onmouseout = hoverProject1Out;

/* For project2 */

function hoverProject2() {
    document.getElementById('project2Hide').classList.remove('hidden');
    document.getElementById('project2').classList.add('hidden');
}

function hoverProject2Out() {
    document.getElementById('project2Hide').classList.add('hidden');
    document.getElementById('project2').classList.remove('hidden');
}

document.getElementById('project2').onmouseover = hoverProject2;

document.getElementById('project2').onmouseout = hoverProject2Out;

/* For project3 */

function hoverProject3() {
    document.getElementById('project3Hide').classList.remove('hidden');
    document.getElementById('project3').classList.add('hidden');
}

function hoverProject3Out() {
    document.getElementById('project3Hide').classList.add('hidden');
    document.getElementById('project3').classList.remove('hidden');
}

document.getElementById('project3').onmouseover = hoverProject3;

document.getElementById('project3').onmouseout = hoverProject3Out;

/* For project4 */

function hoverProject4() {
    document.getElementById('project4Hide').classList.remove('hidden');
    document.getElementById('project4').classList.add('hidden');
}

function hoverProject4Out() {
    document.getElementById('project4Hide').classList.add('hidden');
    document.getElementById('project4').classList.remove('hidden');
}

document.getElementById('project4').onmouseover = hoverProject4;

document.getElementById('project4').onmouseout = hoverProject4Out;

/* For project5 */

function hoverProject5() {
    document.getElementById('project5Hide').classList.remove('hidden');
    document.getElementById('project5').classList.add('hidden');
}

function hoverProject5Out() {
    document.getElementById('project5Hide').classList.add('hidden');
    document.getElementById('project5').classList.remove('hidden');
}

document.getElementById('project5').onmouseover = hoverProject5;

document.getElementById('project5').onmouseout = hoverProject5Out;

/* For project6 */

function hoverProject6() {
    document.getElementById('project6Hide').classList.remove('hidden');
    document.getElementById('project6').classList.add('hidden');
}

function hoverProject6Out() {
    document.getElementById('project6Hide').classList.add('hidden');
    document.getElementById('project6').classList.remove('hidden');
}

document.getElementById('project6').onmouseover = hoverProject6;

document.getElementById('project6').onmouseout = hoverProject6Out;
*/