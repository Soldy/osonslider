            var osonslider = {
            	 interval : "",
            	 intervalac : 0,
            	 trainactive : "none",
            	 trainframe : 50,
            	 trainstartx : 0,
            	 trainstarty : 0,
            	 trainlastx : 0,
            	 trainlasty : 0,
            	 trainposoutx : 100,
            	 trainposouty : 50,
            	 trainround : 0,
            	 traintimeout : 3,
            	 refreszones : {
            	 
            	 },
            	 minimums : {
            	 },
            	 maximums : {
            	 },
                outcomes : {
                },
            }

            osonslidermake("playerstatusbar", 0, 100, "none");
            function osonslidermake(zone, minnum, maxnum, refreshzone){
            	 var outhtml = "";
            	 var zoneid = document.getElementById(zone);
            	 var zonehouse = "osonslidinghouse"+zone;
                var zonerail = "osonslidingrail"+zone;
                var zonetrain = "osonslidingtrain"+zone;
                var heightt = parseInt(zoneid.offsetHeight);
                var widtht = parseInt(zoneid.offsetWidth);
                if ( refreshzone === 'undefined') {
                    refreshzone = 'none';
                }
                osonslider.outcomes[zone] = minnum;
                if (refreshzone !== 'none'){
                    document.getElementById(refreshzone).value = minnum.toString();
                }
                osonslider.refreszones[zone]=refreshzone;
                osonslider.minimums[zone]=minnum;
                osonslider.maximums[zone]=maxnum;
                outhtml = outhtml+"<div class='osonslidinghouse' id='"+zonehouse+"'>";
                outhtml = outhtml+"<div class='osonslidingrail' id='"+zonerail+"'>";
                outhtml = outhtml+"<div class='osonslidingtrain' id='"+zonetrain+"'";
                outhtml = outhtml+" onmousedown='osonslidertrainclick(";
                outhtml = outhtml+'"'+zone+'")';
                outhtml = outhtml+"' onmouseup='osonslidertrainunclick(";
                outhtml = outhtml+'"'+zone+'"'+")'>";
                outhtml = outhtml+"</div></div></div>";
                zoneid.innerHTML = outhtml; 
                document.getElementById(zonehouse).style.height = heightt.toString()+"px";
                document.getElementById(zonehouse).style.width = widtht.toString()+"px";
                document.getElementById(zonerail).style.top = ((heightt-parseInt(document.getElementById(zonerail).offsetHeight))/2).toString()+'px';
                document.getElementById(zonerail).style.width = widtht.toString()+"px";
                document.getElementById(zonetrain).style.top = (-1*(parseInt(document.getElementById(zonetrain).offsetHeight)-parseInt(document.getElementById(zonerail).offsetHeight))/2).toString()+'px';
            }
            
            function osonslidertrainclick (slidertrain) {
                if (osonslider.trainactive !== slidertrain){
               	  osonslidertrainunclick();
                }
                if (osonslider.intervalac === 0) {
                   osonslider.trainactive = slidertrain;
           	   	 osonslider.intervalac = 1;
           	   	 osonslider.trainstartx = osonpointer.p[0].posx;
           	   	 osonslider.trainstarty = osonpointer.p[0].posy;
           	   	 osonslider.trainlastx = osonpointer.p[0].posx;
           	   	 osonslider.trainlasty = osonpointer.p[0].posy;
                   osonslider.interval=setInterval(function(){osonslidertrainmove()}, osonslider.trainframe);
                }     	
            	
            }
            
            function osonsliderminc(zone, minnum) {
                osonslider.minimums[zone]=minnum;	
                osonslidertrainmove();
            }

            function osonslidermaxc(zone, maxnum) {
                osonslider.maximums[zone]=maxnum;	
                osonslidertrainmove();
            }
            function osonsliderlimitc(zone, minnum, maxnum) {
                osonslider.minimums[zone]=minnum;
                osonslider.maximums[zone]=maxnum;	
                osonslidertrainmove();
            }
            
            function osonslidertrainunclick () {
           	    clearInterval(osonslider.interval);
                osonslider.intervalac = 0;
                osonslider.trainstartx = 0;
           	    osonslider.trainstarty = 0;
          	    osonslider.trainlastx = 0;
                osonslider.trainlasty = 0;
           	    osonslider.trainround = 0;
           	    osonslider.trainactive = "none";
            }            
            
            function osonslidertrainmove() {
                if (osonpointer.p[0].posx === osonslider.trainlastx ) {
                    osonslider.trainround++;
                    if (osonslider.trainround > osonslider.trainframe*osonslider.traintimeout){
                        osonslidertrainunclick();	
                    }
               } else {
                   if (osonpointer.p[0].posy > osonslider.trainstarty+osonslider.trainposouty  || osonslider.trainstarty-osonslider.trainposouty > osonmouse.posy){
               		 osonslidertrainunclick();
               	 } else {
               	    var corid = osonslider.trainactive;
                      var corsid = "osonslidinghouse"+osonslider.trainactive;
                      var corsbid = "osonslidingrail"+osonslider.trainactive;
                      var corspbid = "osonslidingtrain"+osonslider.trainactive;
           	          var pos = {
           	                left : parseInt(document.getElementById(corspbid).offsetLeft),
           	                top : parseInt(document.getElementById(corspbid).offsetTop),
           	          }
           	          pos.left = parseInt(pos.left/osonfit.scale);
//           	          writedebug(parseInt(pos.left).toString()+' , '+parseInt(pos.top).toString()+'<br>');
                      if (0 > pos.left+(osonpointer.p[0].posx-osonslider.trainlastx)) {
                          document.getElementById(corspbid).style.left='0px';
                          osonslider.outcomes[osonslider.trainactive] = osonslider.minimums[osonslider.trainactive];
                          if (osonslider.refreszones[osonslider.trainactive] !== 'none'){
                              document.getElementById(osonslider.refreszones[osonslider.trainactive]).value = osonslider.outcomes[osonslider.trainactive].toString();
                          }
                      	  osonslidertrainunclick();
           	          } else if(pos.left+(osonpointer.p[0].posx-osonslider.trainlastx) > parseInt(document.getElementById(corsbid).offsetwidth)-parseInt(document.getElementById(corspbid).offsetWidth)){
          	          	  document.getElementById(corsbid).style.left = (parseInt(document.getElementById(corsbid).outerWidth)-parseInt(document.getElementById(corspbid).offsetWidth)).toString()+'px';
                          osonslider.outcomes[osonslider.trainactive] = osonslider.maximums[osonslider.trainactive];
                          if (osonslider.refreszones[osonslider.trainactive] !== 'none'){
                              document.getElementById(osonslider.refreszones[osonslider.trainactive]).value = osonslider.outcomes[osonslider.trainactive].toString();
                          }
                          osonslidertrainunclick();
           	          } else {
           	              document.getElementById(corspbid).style.left = ( parseInt(document.getElementById(corspbid).offsetLeft)+(osonpointer.p[0].posx-osonslider.trainlastx)).toString()+'px'; 	
                          pos = {
           	                left : parseInt(document.getElementById(corspbid).offsetLeft),
           	                top : parseInt(document.getElementById(corspbid).offsetTop),
           	              }
                          pos.left = parseInt(pos.left/osonfit.scale);
                          osonslider.outcomes[osonslider.trainactive] = parseInt((osonslider.maximums[osonslider.trainactive]-osonslider.minimums[osonslider.trainactive])*((pos.left)/parseInt(document.getElementById(corsbid).offsetWidth)-parseInt(document.getElementById(corspbid).offsetWidth)))+osonslider.minimums[osonslider.trainactive];
                          if (osonslider.refreszones[osonslider.trainactive] !== 'none'){
                              document.getElementById(osonslider.refreszones[osonslider.trainactive]).value = osonslider.outcomes[osonslider.trainactive].toString();
                          }
           	          }
           	          
           	          osonslider.trainlastx = osonpointer.p[0].posx;

               	 }
               }
            }   
            
            function osonslidergetdata(slider){
          	    var corid = document.getElementById(slider);
                var corsid = document.getElementById("osonslidinghouse"+slider);
                var corsbid = document.getElementById("osonslidingrail"+slider);
                var corspbid = document.getElementById("osonslidingtrain"+slider);            	
    	          pos = parseInt(corspbid.style.left);            	
                var outvar = pos/(corsbid.offsetWidth-corspbid.offsetWidth);
                return outvar;
            }

            function osonsliderchangedata(slider, newdata){
          	    var corid = document.getElementById(slider);
                var corsid = document.getElementById("osonslidinghouse"+slider);
                var corsbid = document.getElementById("osonslidingrail"+slider);
                var corspbid = document.getElementById("osonslidingtrain"+slider);            	
   	          if ((parseInt(newdata)>osonslider.minimums[slider]) && (osonslider.maximums[slider]>parseInt(newdata))){
                    corspbid.style.left = (((parseInt(corsbid.offsetWidth)-parseInt(corspbid.offsetWidth))*((parseInt(newdata)-osonslider.minimums[slider])/(osonslider.maximums[slider]-osonslider.minimums[slider]))).toString()+'px');
                    if(osonslider.refreszones[slider] !== 'none'){
                        document.getElementById(osonslider.refreszones[slider]).value = parseInt(newdata).toString();
                    }
                    osonslider.outcomes[slider] = parseInt(newdata);
                } else {
                    if(osonslider.refreszones[slider] !== 'none'){
                        document.getElementById(osonslider.refreszones[slider]).value = osonslider.outcomes[slider].toString();
                    }               
                }
            }