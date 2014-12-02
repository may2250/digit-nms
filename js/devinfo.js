﻿var treeData = [
	{title: "输入通道", folder: true, key: "id3", expanded: true,
	  children: [
		{title: "通道1 (ASI-1)",
		  children: [
			{title: "Sub-item 3.1.1", key: "id3.1.1" },
			{title: "Sub-item 3.1.2", key: "id3.1.2" }
		  ]
		},
		{title: "通道2 (ASI-2)",
		  children: [
			{title: "Sub-item 3.2.1", key: "id3.2.1" },
			{title: "Sub-item 3.2.2", key: "id3.2.2" }
		  ]
		},
		{title: "通道3 (ASI-3)", key: "id4", expanded: true,
		  children: [
			{title: "Sub-item 4.1 (active on init)",
			  children: [
				{title: "Sub-item 4.1.1", key: "id4.1.1" },
				{title: "Sub-item 4.1.2", key: "id4.1.2" }
			  ]
			},
			{title: "Sub-item 4.2 (selected on init)",
			  children: [
				{title: "Sub-item 4.2.1", key: "id4.2.1" },
				{title: "Sub-item 4.2.2", key: "id4.2.2" }
			  ]
			},
			{title: "Sub-item 4.3 (hideCheckbox)", hideCheckbox: true },
			{title: "Sub-item 4.4 (unselectable)", unselectable: true }
		  ]
		},
		{title: "通道4 (ASI-4)" }
	  ]
	},
	
];

var programData = [
	{title: "节目", folder: true, key: "id1", expanded: true,
	  children: [
		{title: "Sub-item 3.1",
		  children: [
			{title: "Sub-item 3.1.1", key: "id3.1.1" },
			{title: "Sub-item 3.1.2", key: "id3.1.2" }
		  ]
		},
		{title: "Sub-item 3.2",
		  children: [
			{title: "Sub-item 3.2.1", key: "id3.2.1" },
			{title: "Sub-item 3.2.2", key: "id3.2.2" }
		  ]
		},
		{title: "Document with some children (expanded on init)", key: "id4", expanded: true,
		  children: [
			{title: "Sub-item 4.1 (active on init)", 
			  children: [
				{title: "Sub-item 4.1.1", key: "id4.1.1" },
				{title: "Sub-item 4.1.2", key: "id4.1.2" }
			  ]
			},
			{title: "Sub-item 4.2 (selected on init)",
			  children: [
				{title: "Sub-item 4.2.1", key: "id4.2.1" },
				{title: "Sub-item 4.2.2", key: "id4.2.2" }
			  ]
			},
			{title: "Sub-item 4.3 (hideCheckbox)", hideCheckbox: true },
			{title: "Sub-item 4.4 (unselectable)", unselectable: true }
		  ]
		},
		{title: "Lazy folder", folder: true, lazy: true }
	  ]
	}
	
];

var dataSet = [
	['0','2','MPEG2 Video','488','488'],
	['1','2','MPEG2 Audio','460','460'],
	['2','2','MPEG2 Audio','461','461'],
	['3','2','MPEG2 Audio','456','456']	
];

function tbl_output() {
	$(".tab2Content").empty();
	$(".tab2Content").append(
		+'<div class="clearfix">'
			+'<div id="out_tree" class="tbl_struct"></div>'
			+'<table cellpadding="0" cellspacing="0" border="0" class="cell-border compact hover" id="tbl_outtable"></table>'
		+'</div>'
		+'<div id="dialog-NIT" title="NIT段编辑">'			
			+'<div class="nit_edit">'
				+'<label>网络ID</label>'
				+'<input type="text" class="nit_id" value=""></input>&nbsp(十六进制)'
				+'<label>网络名称</label>'
				+'<input type="text" class="nit_name" value="段1"></input>'
				+'<textarea rows="5">'
				+'</textarea>'
			+'</div>'
		+'</div>'
		+'<!-- Definition of context menu -->'
		+'<ul id="table_menu" class="contextMenu ui-helper-hidden">'
			+'<li class="menu_expandall"><a href="#expandall"><span class="ui-icon ui-icon-folder-open"></span>展开所有子节点</a></li>'
			+'<li class="menu_collasp"><a href="#collasp"><span class="ui-icon ui-icon-folder-collapsed"></span>收起节点</a></li>'
			+'<li>---</li>'
			+'<li class="menu_add"><a href="#add"><span class="ui-icon ui-icon-plusthick"></span>添加段</a></li>'
			+'<li class="menu_delete"><a href="#delete"><span class="ui-icon ui-icon-closethick"></span>删除段</a></li>'
			+'<li>---</li>'
			+'<li class="menu_import"><a href="#import"><span class="ui-icon ui-icon-pencil"></span>NIT表导入</a></li>'			
			+'<li class="menu_export"><a href="#export"><span class="ui-icon ui-icon-closethick"></span>NIT表导出</a></li>'			
			
		+'</ul>'
	);
	
	//表结构树
	$("#out_tree").fancytree({
		extensions: ["menu"],
		checkbox: true,
		selectMode: 2,
		minExpandLevel:3,
		source: treeData,
		menu: {
			selector: "#table_menu",
			position: {my: "center"},
			create: function(event, data){
			    $.ui.fancytree.debug("Menu create ", data.$menu);
			},
			beforeOpen: function(event, data){
			    $.ui.fancytree.debug("Menu beforeOpen ", data.$menu, data.node);				
			},
			open: function(event, data){
			  $.ui.fancytree.debug("Menu open ", data.$menu, data.node);
			},
			focus: function(event, data){
			  $.ui.fancytree.debug("Menu focus ", data.menuId, data.node);
			},
			select: function(event, data){				
				switch(data.menuId){
					case '#expandall' :{
						var nodes = data.node.children;
						data.node.setExpanded(true);
						$.each(nodes, function(index,item){
							item.setExpanded(true);
							//item.render();
						});
						break;
					} case '#collasp': {
						data.node.setExpanded(false);
						break;
					} case '#add': {
						dialog_NIT.dialog( "open" );
						break;
					} case '#delete': {
						//dialog.dialog( "open" );
						break;
					} case '#import': {
						
						break;
					} case '#export': {
						
						break;
					} default: {
						alert("Menu select " + data.menuId + ", " + data.node);
						break;
					}			  
				}
			},
			close: function(event, data){
			  $.ui.fancytree.debug("Menu close ", data.$menu, data.node);
			}
		},
		select: function(event, data) {
			// Display list of selected nodes
			var selNodes = data.tree.getSelectedNodes();
			// convert to title/key array
			var selKeys = $.map(selNodes, function(node){
				 return "[" + node.key + "]: '" + node.title + "'";
			  });
			//$("#echoSelection2").text(selKeys.join(", "));
		},
		click: function(event, data) {
			// We should not toggle, if target was "checkbox", because this
			// would result in double-toggle (i.e. no toggle)
			if( $.ui.fancytree.getEventTargetType(event) === "title" ){
			  data.node.toggleSelected();
			}
		}
	});
	
	$('#tbl_outtable').dataTable( {
		"data": dataSet,
		"order": [[ 0, "asc" ]],
		"paging":   false,
		"info":     false,
		"searching":   false,
		"scrollCollapse": true,
		"columns": [
			{ "title": "NO" },
			{ "title": "CH" },
			{ "title": "IN-PID"},
			{ "title": "OUT-PID"},
			{ "title": "TYPE" }
		]
	}); 
	
	//编辑节目右键菜单弹出对话框
	var dialog_NIT = $( "#dialog-NIT" ).dialog({
		autoOpen: false,
		height: 500,
		width: 600,
		modal: true,
		buttons: {
			"确定": function() {
			  dialog_NIT.dialog( "close" );
			},
			"取消": function() {
			  dialog_NIT.dialog( "close" );
			}
		}
	});
}
	
function devinfo_output(){
	$('.main-content').empty();
	$('.main-content').append(
		'<script src="lib/jquery.ui.popup.js" type="text/javascript"></script>'
		+'<script src="lib/jquery.ui-contextmenu.js" type="text/javascript"></script>'
		+'<script src="lib/jquery.fancytree.menu.js" type="text/javascript"></script>'
		+'<div id="devoutput">'
			+'<ul>'
				+'<li><a href="#tabs-1">输出通道1</a></li>'
				+'<li><a href="#tabs-2">表结构1</a></li>'
			+'</ul>'
			+'<div id="tabs-1">'
				+'<div class="clearfix">'
					+'<div id="devlist" class="channel_input"></div>'
					+'<div id="channel" class="program"></div>'
				+'</div>'
				+'<div class="tbn_div">'
					+'<button id="output-read" class="STRING_READ">读取</button>'
					+'<button id="output-table" class="STRING_WRITE">制表</button>'
					+'<button id="output-write" class="STRING_WRITE">应用</button>'					
				+'</div>'
			+'</div>'
			+'<div id="tabs-2">'
				+'<div class="clearfix">'
					+'<div id="out_tree" class="tbl_struct"></div>'
					+'<div id="out_table">'
						+'<table cellpadding="0" cellspacing="0" border="0" class="cell-border compact hover" id="tbl_outtable"></table>'
					+'</div>'
					
				+'</div>'
				+'<div id="dialog-NIT" title="NIT段编辑">'			
					+'<div class="nit_edit">'
						+'<label>网络ID</label>'
						+'<input type="text" class="nit_id" value=""></input>&nbsp(十六进制)'
						+'<label>网络名称</label>'
						+'<input type="text" class="nit_name" value="段1"></input>'
						+'<br/>'
						+'<textarea rows="5">'
						+'</textarea>'
					+'</div>'
				+'</div>'
				+'<!-- Definition of context menu -->'
				+'<ul id="table_menu" class="contextMenu ui-helper-hidden">'
					+'<li class="menu_expandall"><a href="#expandall"><span class="ui-icon ui-icon-folder-open"></span>展开所有子节点</a></li>'
					+'<li class="menu_collasp"><a href="#collasp"><span class="ui-icon ui-icon-folder-collapsed"></span>收起节点</a></li>'
					+'<li>---</li>'
					+'<li class="menu_add"><a href="#add"><span class="ui-icon ui-icon-plusthick"></span>添加段</a></li>'
					+'<li class="menu_delete"><a href="#delete"><span class="ui-icon ui-icon-closethick"></span>删除段</a></li>'
					+'<li>---</li>'
					+'<li class="menu_import"><a href="#import"><span class="ui-icon ui-icon-pencil"></span>NIT表导入</a></li>'			
					+'<li class="menu_export"><a href="#export"><span class="ui-icon ui-icon-closethick"></span>NIT表导出</a></li>'			
					
				+'</ul>'
			+'</div>'
		+'</div>'
		+'<!-- Definition of context menu -->'
		+'<ul id="program_menu" class="contextMenu ui-helper-hidden">'
			+'<li class="menu_expandall"><a href="#expandall"><span class="ui-icon ui-icon-folder-open"></span>展开所有子节点</a></li>'
			+'<li class="menu_collasp"><a href="#collasp"><span class="ui-icon ui-icon-folder-collapsed"></span>收起节点</a></li>'
			+'<li>---</li>'
			+'<li class="menu_delete"><a href="#delete"><span class="ui-icon ui-icon-closethick"></span>删除这个节目</a></li>'
			+'<li class="menu_edit"><a href="#edit"><span class="ui-icon ui-icon-pencil"></span>编辑这个节目</a></li>'			
			+'<li class="menu_deleteall"><a href="#deleteall"><span class="ui-icon ui-icon-closethick"></span>删除下一级所有自增描述符</a></li>'			
			+'<li class="menu_add"><a href="#add"><span class="ui-icon ui-icon-plusthick"></span>添加自增描述符</a></li>'
			
			+'<li class="menu_prgdeleteall" style="display:none"><a href="#prgdeleteall"><span class="ui-icon ui-icon-closethick"></span>删除所有节目</a></li>'
			+'<li class="menu_prgitems" style="display:none"><a href="#itmes"><span class="ui-icon ui-icon-tag"></span>选项</a></li>'			
			+'<li class="menu_re_prg" style="display:none"><a href="#re_prg"><span class="ui-icon ui-icon-refresh"></span>重新分配节目号</a></li>'			
			+'<li class="menu_re_pid" style="display:none"><a href="#re_pid"><span class="ui-icon ui-icon-refresh"></span>重新分配PID</a></li>'
			+'<li class="menu_pidtrans" style="display:none"><a href="#pidtrans"><span class="ui-icon ui-icon-pin-s"></span>PID透传</a></li>'
		+'</ul>'
		+'<div id="dialog-form" title="编辑节目">'
			+'<table class="tbl_program">'
				+'<tr>'
					+'<td><label>名称</label></td>'
					+'<td><input type="text" class="prg_name" value=""></input></td>'
					+'<td><label>业务类型</label></td>'
					+'<td><select ><option value ="1">digital television service</option><option value ="2">analog television service</option></select></td>'
				+'</tr>'
				+'<tr>'
					+'<td><label>提供商名称</label></td>'
					+'<td><input type="text" class="prg_merchant" value=""></input></td>'
					+'<td><label>节目号</label></td>'
					+'<td><input type="text" style="width:50px" class="prg_no" value=""></input> <label>PMT_PID(Hex)</label><input style="width:50px" type="text" class="prg_pid" value="1389"></input></td>'
				+'</tr>'
				+'<tr>'
					+'<td><label>PRC通道</label></td>'
					+'<td><input style="disabled" type="text" class="prg_prc" value="2"></input></td>'
					+'<td><label>PRC_PID(Hex)</label></td>'
					+'<td><input type="text" style="width:50px" class="prg_prc1" value="488"></input> --><input style="width:50px" type="text" class="prg_prc2" value="488"></input><input style="margin-left:10px" type="checkbox">加扰</input></td>'
				+'</tr>'
			+'</table>'
			+'<div class="tbl_editprg">'
				+'<table cellpadding="0" cellspacing="0" border="0" class="cell-border compact hover" id="tbl_editprg"></table>'
			+'</div>'
		+'</div>'
		+'<div id="dialog-items" title="输出通道设置">'
			+'<table class="tbl_items">'
				+'<tr>'
					+'<td><label>传输流ID</label></td><td><input type="text" class="item_transid" value=""></input></td>'
				+'</tr>'
				+'<tr>'
					+'<td><label>网络ID</label></td><td><input type="text" class="item_netid" value=""></input></td>'
				+'</tr>'
				+'<tr>'
					+'<td><label>原始网络ID</label></td><td><input type="text" class="item_orignetid" value=""></input></td>'
				+'</tr>'
				+'<tr>'
					+'<td><label>输出总码率  (Kpbs)</label></td><td><input type="text" class="item_out" value=""></input></td>'
				+'</tr>'
				+'<tr>'
					+'<td><input type="checkbox">    自动增长版本号</input></td><td><label class="item_transid">2</label></td>'
				+'</tr>'
			+'</table>'
			+'<input type="checkbox" class="pat_auto">    当生成PAT时按业务ID排序</input>'
			+'<fieldset>'
				+'<legend>选择需要的表</legend>'
					+'<input type="checkbox" class="sl_pat">    PAT</input>'
					+'<input type="checkbox" class="sl_pmt">    PMT</input>'
					+'<input type="checkbox" class="sl_sdt">    SDT</input>'
					+'<input type="checkbox" class="sl_cat">    CAT</input>'
					+'<input type="checkbox" class="sl_nit">    NIT</input>'
			+'</fieldset>'
		+'</div>'
	);
	
	$('#tbl_editprg').dataTable( {
		"data": dataSet,
		"order": [[ 0, "asc" ]],
		"paging":   false,
		"info":     false,
		"searching":   false,
		"scrollCollapse": true,
		"columns": [
			{ "title": "序号" },
			{ "title": "输入通道", "width": "70px"},
			{ "title": "流类型"},
			{ "title": "输入PID(Hex)"},
			{ "title": "输出PID(Hex)" }
		]
	});    	
	
	//表结构右侧table
	$('#tbl_outtable').dataTable( {
		"data": dataSet,
		"order": [[ 0, "asc" ]],
		"paging":   false,
		"info":     false,
		"searching":   false,
		"scrollCollapse": true,
		"columns": [
			{ "title": "NO"},
			{ "title": "CH"},
			{ "title": "IN-PID", "width":"30%"},
			{ "title": "OUT-PID"},
			{ "title": "TYPE" }
		]
	});
	
	var tabs = $("#devoutput").tabs();
	$( "#output-read" ).button({
      icons: {
        primary: "ui-icon-comment"
      }
    }).click(function( event ) {
        event.preventDefault();
		alert('------------------!!!');
    });
	
	$( "#output-table" ).button({
      icons: {
        primary: "ui-icon-gear"
      }
    }).click(function( event ) {
        event.preventDefault();
		alert('------------------!!!');
    });
	
	$( "#output-write" ).button({
      icons: {
        primary: "ui-icon-pencil"
      }
    }).click(function( event ) {
        event.preventDefault();
		alert('------------------!!!');
    });
	//输入通道树
	$("#devlist").fancytree({
		//extensions: ["select"],
		checkbox: true,
		selectMode: 2,
		minExpandLevel:3,
		source: treeData,
		select: function(event, data) {
			// Display list of selected nodes
			var selNodes = data.tree.getSelectedNodes();
			// convert to title/key array
			var selKeys = $.map(selNodes, function(node){
				 return "[" + node.key + "]: '" + node.title + "'";
			  });
			//$("#echoSelection2").text(selKeys.join(", "));
		},
		click: function(event, data) {
			// We should not toggle, if target was "checkbox", because this
			// would result in double-toggle (i.e. no toggle)
			if( $.ui.fancytree.getEventTargetType(event) === "title" ){
			  data.node.toggleSelected();
			}
		}
	});
	//节目树
	$("#channel").fancytree({
		extensions: ["menu"],
		selectMode: 1,
		minExpandLevel:2,
		source: programData,
		menu: {
			selector: "#program_menu",
			position: {my: "center"},
			create: function(event, data){
			    $.ui.fancytree.debug("Menu create ", data.$menu);
			},
			beforeOpen: function(event, data){
			    $.ui.fancytree.debug("Menu beforeOpen ", data.$menu, data.node);
				if(data.node.key == "id1"){
					$(".menu_add").css("display", "none");
					$(".menu_deleteall").css("display", "none");
					$(".menu_edit").css("display", "none");
					$(".menu_delete").css("display", "none");
					$(".menu_prgdeleteall").css("display", "block");
					$(".menu_prgitems").css("display", "block");
					$(".menu_re_prg").css("display", "block");
					$(".menu_re_pid").css("display", "block");
					$(".menu_pidtrans").css("display", "block");
				}else{
					$(".menu_prgdeleteall").css("display", "none");
					$(".menu_prgitems").css("display", "none");
					$(".menu_re_prg").css("display", "none");
					$(".menu_re_pid").css("display", "none");
					$(".menu_pidtrans").css("display", "none");
					$(".menu_add").css("display", "block");
					$(".menu_deleteall").css("display", "block");
					$(".menu_edit").css("display", "block");
					$(".menu_delete").css("display", "block");
				}
			    
			},
			open: function(event, data){
			  $.ui.fancytree.debug("Menu open ", data.$menu, data.node);
			},
			focus: function(event, data){
			  $.ui.fancytree.debug("Menu focus ", data.menuId, data.node);
			},
			select: function(event, data){				
				switch(data.menuId){
					case '#expandall' :{
						var nodes = data.node.children;
						data.node.setExpanded(true);
						$.each(nodes, function(index,item){
							item.setExpanded(true);
							//item.render();
						});
						break;
					} case '#collasp': {
						data.node.setExpanded(false);
						break;
					} case '#delete': {
						
						break;
					} case '#edit': {
						dialog.dialog( "open" );
						break;
					} case '#deleteall': {
						
						break;
					} case '#add': {
						
						break;
					} case '#prgdeleteall': {
						
						break;
					} case '#itmes': {
						dig_itmes.dialog( "open" );
						break;
					} case '#re_prg': {
						
						break;
					} case '#re_pid': {
						
						break;
					} case '#pidtrans': {
						
						break;
					} default: {
						alert("Menu select " + data.menuId + ", " + data.node);
						break;
					}			  
				}
			},
			close: function(event, data){
			  $.ui.fancytree.debug("Menu close ", data.$menu, data.node);
			}
		},
		select: function(event, data) {
			// Display list of selected nodes
			var selNodes = data.tree.getSelectedNodes();
			// convert to title/key array
			var selKeys = $.map(selNodes, function(node){
				 return "[" + node.key + "]: '" + node.title + "'";
			  });
		},
		click: function(event, data) {
			// We should not toggle, if target was "checkbox", because this
			// would result in double-toggle (i.e. no toggle)
			if( $.ui.fancytree.getEventTargetType(event) === "title" ){
			  data.node.toggleSelected();
			}
		}
	});	
	
	//表结构树
	$("#out_tree").fancytree({
		extensions: ["menu"],
		checkbox: true,
		selectMode: 2,
		minExpandLevel:3,
		source: treeData,
		menu: {
			selector: "#table_menu",
			position: {my: "center"},
			create: function(event, data){
			    $.ui.fancytree.debug("Menu create ", data.$menu);
			},
			beforeOpen: function(event, data){
			    $.ui.fancytree.debug("Menu beforeOpen ", data.$menu, data.node);				
			},
			open: function(event, data){
			  $.ui.fancytree.debug("Menu open ", data.$menu, data.node);
			},
			focus: function(event, data){
			  $.ui.fancytree.debug("Menu focus ", data.menuId, data.node);
			},
			select: function(event, data){				
				switch(data.menuId){
					case '#expandall' :{
						var nodes = data.node.children;
						data.node.setExpanded(true);
						$.each(nodes, function(index,item){
							item.setExpanded(true);
							//item.render();
						});
						break;
					} case '#collasp': {
						data.node.setExpanded(false);
						break;
					} case '#add': {
						dialog_NIT.dialog( "open" );
						break;
					} case '#delete': {
						//dialog.dialog( "open" );
						break;
					} case '#import': {
						
						break;
					} case '#export': {
						
						break;
					} default: {
						alert("Menu select " + data.menuId + ", " + data.node);
						break;
					}			  
				}
			},
			close: function(event, data){
			  $.ui.fancytree.debug("Menu close ", data.$menu, data.node);
			}
		},
		select: function(event, data) {
			// Display list of selected nodes
			var selNodes = data.tree.getSelectedNodes();
			// convert to title/key array
			var selKeys = $.map(selNodes, function(node){
				 return "[" + node.key + "]: '" + node.title + "'";
			  });
			//$("#echoSelection2").text(selKeys.join(", "));
		},
		click: function(event, data) {
			// We should not toggle, if target was "checkbox", because this
			// would result in double-toggle (i.e. no toggle)
			if( $.ui.fancytree.getEventTargetType(event) === "title" ){
			  data.node.toggleSelected();
			}
		}
	});	 
	
	//编辑节目右键菜单弹出对话框
	var dialog_NIT = $( "#dialog-NIT" ).dialog({
		autoOpen: false,
		height: 500,
		width: 600,
		modal: true,
		buttons: {
			"确定": function() {
			  dialog_NIT.dialog( "close" );
			},
			"取消": function() {
			  dialog_NIT.dialog( "close" );
			}
		}
	});
	
	//编辑节目右键菜单弹出对话框
	var dialog = $( "#dialog-form" ).dialog({
		autoOpen: false,
		height: 500,
		width: 770,
		modal: true,
		buttons: {
			"添加":function() {
			  dialog.dialog( "close" );
			} ,
			"删除":function() {
			  dialog.dialog( "close" );
			},
			"确定": function() {
			  dialog.dialog( "close" );
			},
			"取消": function() {
			  dialog.dialog( "close" );
			}
		}
	});
	//选项右键菜单弹出对话框
	var dig_itmes = $( "#dialog-items" ).dialog({
		autoOpen: false,
		width: 470,
		modal: true,
		buttons: {				
			"确定": function() {
			  dig_itmes.dialog( "close" );
			},
			"取消": function() {
			  dig_itmes.dialog( "close" );
			},
			"应用":function() {
			  dig_itmes.dialog( "close" );
			}
		}
	});
}


function dev_srcset() {
	$('.main-content').empty();
	$('.main-content').append(
		'<div class="src_content">'
			+'<fieldset>'
				+'<legend>源设置</legend>'
				+'<table>'
					+'<tr>'
						+'<td><label>网络接口模式</label></td>'
						+'<td><label style="margin-left:30px" label>10M</label></td>'
					+'</tr>'
					+'<tr>'
						+'<td><label>源IP地址</label></td>'
						+'<td><input type="text" value=""></input><label>&nbsp &nbsp(eg:192.168.1.103)</label></td>'
					+'</tr>'
					+'<tr>'
						+'<td><label>源端口号</label></td>'
						+'<td><input type="text" value=""></input><label>&nbsp &nbsp(0~65535)</label></td>'
					+'</tr>'
					+'<tr>'
						+'<td><label>源MAC</label></td>'
						+'<td><input type="text" value=""></input><label>&nbsp &nbsp(值为16进制  eg:00:11:22:33:44:55)</label></td>'
					+'</tr>'
				+'</table>'
				+'<div class="src_btn">'
					+'<button id="src-read" class="STRING_READ">读取</button>'
					+'<button id="src-write" class="STRING_WRITE">应用</button>'
				+'</div>'
			+'</fieldset>'
		+'</div>'
	);
	
	
	$( "#src-read" ).button({
      icons: {
        primary: "ui-icon-comment"
      }
    }).click(function( event ) {
        event.preventDefault();
		alert('------------------!!!');
    });
	
	$( "#src-write" ).button({
      icons: {
        primary: "ui-icon-pencil"
      }
    }).click(function( event ) {
        event.preventDefault();
		alert('------------------!!!');
    });

}

function dev_outset() {
	$('.main-content').empty();
	$('.main-content').append(
		'<div class="src_content">'
			+'<fieldset>'
				+'<legend>输出设置  [CH-1]</legend>'
				+'<table>'
					+'<tr>'
						+'<td><label>输出方式</label></td>'
						+'<td><label style="margin-left:30px" label>UDP</label></td>'
					+'</tr>'
					+'<tr>'
						+'<td><label>目的IP地址</label></td>'
						+'<td><input type="text" value=""></input><label>&nbsp &nbsp(eg:192.168.1.103)</label></td>'
					+'</tr>'
					+'<tr>'
						+'<td><label>目的端口号</label></td>'
						+'<td><input type="text" value=""></input><label>&nbsp &nbsp(0~65535)</label></td>'
					+'</tr>'
					+'<tr>'
						+'<td><label>目的MAC</label></td>'
						+'<td><input type="text" value=""></input><label>&nbsp &nbsp(值为16进制  eg:00:11:22:33:44:55)</label></td>'
					+'</tr>'
				+'</table>'
				+'<div class="src_btn">'
					+'<button id="out-read" class="STRING_READ">读取</button>'
					+'<button id="out-write" class="STRING_WRITE">应用</button>'
				+'</div>'
			+'</fieldset>'
		+'</div>'
	);
	
	
	$( "#out-read" ).button({
      icons: {
        primary: "ui-icon-comment"
      }
    }).click(function( event ) {
        event.preventDefault();
		alert('------------------!!!');
    });
	
	$( "#out-write" ).button({
      icons: {
        primary: "ui-icon-pencil"
      }
    }).click(function( event ) {
        event.preventDefault();
		alert('------------------!!!');
    });

}