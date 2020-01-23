

export default class HtmlView {
    constructor(){
        //create the top toolbox
        let toolbox_top = document.createElement('div');
        toolbox_top.className = 'toolbox_top';

        //create tools section in top toolbox
        let items_tools = document.createElement('div');
        items_tools.className='items';
        //inside the tool section
        let icon_tool = document.createElement('div');
        icon_tool.className='icons';
        let img_tool = document.createElement('img');
        img_tool.src = '../img/tools.png';
        icon_tool.appendChild(img_tool);
        items_tools.appendChild(icon_tool);
        toolbox_top.appendChild(items_tools);

        //create the tools elements
        let ul_tools = document.createElement('ul');
        let tools_titles = ['eraser','brush','paint-bucket'];
        for(let i=0;i<3;i++){
            let li_tools = document.createElement('li');
            let li_elements = document.createElement('div');
            let img_elements = document.createElement('img');
            img_elements.src = '../img/'+tools_titles[i]+'.png';
            li_elements.className='item tools'
            li_elements.title = tools_titles[i];
            li_elements.appendChild(img_elements);
            li_tools.appendChild(li_elements);
            ul_tools.appendChild(li_tools);
        }
        items_tools.appendChild(ul_tools);

        //create shapes section in top toolbox
        let items_shapes = document.createElement('div');
        items_shapes.className='items';

        //inside the shapes section
        let icon_shapes = document.createElement('div');
        icon_shapes.className='icons';
        let img_shapes = document.createElement('img');
        img_shapes.src = '../img/shapes.png';
        icon_shapes.appendChild(img_shapes);
        items_shapes.appendChild(icon_shapes);
        toolbox_top.appendChild(items_shapes);

        //create the shapes 
        let ul_shapes = document.createElement('ul');
        let shapes_titles = ['circle','triangle','rectangle','line'];
        for(let i=0;i<4;i++){
            let li_shapes = document.createElement('li');
            let li_elements = document.createElement('div');
            let img_elements = document.createElement('img');
            img_elements.src = '../img/'+shapes_titles[i]+'.png';
            li_elements.className='item tools'
            li_elements.title = shapes_titles[i];
            li_elements.appendChild(img_elements);
            li_shapes.appendChild(li_elements);
            ul_shapes.appendChild(li_shapes);
        }
        items_shapes.appendChild(ul_shapes);

        //create commands section in top toolbox
        let items_commands = document.createElement('div');
        items_commands.className='items';

        //inside the commands section
        let icon_commands = document.createElement('div');
        icon_commands.className='icons';
        let img_commands = document.createElement('img');
        img_commands.src = '../img/open.png';
        icon_commands.appendChild(img_commands);
        items_commands.appendChild(icon_commands);
        toolbox_top.appendChild(items_commands);

        //create the commands elements 
        let ul_commands = document.createElement('ul');
        let commands_titles = ['save','open'];
        for(let i=0;i<2;i++){
            let li_commands = document.createElement('li');
            let li_elements = document.createElement('div');
            let img_elements = document.createElement('img');
            img_elements.src = '../img/'+commands_titles[i]+'.png';
            li_elements.className='item commands'
            li_elements.title = commands_titles[i];
            li_elements.appendChild(img_elements);
            li_commands.appendChild(li_elements);
            ul_commands.appendChild(li_commands);
        }
        items_commands.appendChild(ul_commands);
        document.body.appendChild(toolbox_top);

        //create left tool_box
        let toolbox_left = document.createElement('div');
        toolbox_left.className = 'toolbox_left';

        //size 1
        let _1pixel = document.createElement('div');

        _1pixel.className='line_width on';
        _1pixel.title= "1 pixels";
        _1pixel.style.width='4px';
        _1pixel.style.height='4px';
        toolbox_left.appendChild(_1pixel);

        //size 2
        let _2pixel = document.createElement('div');

        _2pixel.className='line_width';
        _2pixel.title= "2 pixels";
        _2pixel.style.width='6px';
        _2pixel.style.height='6px';
        toolbox_left.appendChild(_2pixel);

        //size 3
        let _3pixel = document.createElement('div');

        _3pixel.className='line_width';
        _3pixel.title= "3 pixels";
        _3pixel.style.width='8px';
        _3pixel.style.height='8px';
        toolbox_left.appendChild(_3pixel);

        //size 4
        let _4pixel = document.createElement('div');

        _4pixel.className='line_width';
        _4pixel.title= "4 pixels";
        _4pixel.style.width='10px';
        _4pixel.style.height='10px';
        toolbox_left.appendChild(_4pixel);

        //size 5
        let _5pixel = document.createElement('div');

        _5pixel.className='line_width';
        _5pixel.title= "5 pixels";
        _5pixel.style.width='12px';
        _5pixel.style.height='12px';
        toolbox_left.appendChild(_5pixel);


        document.body.appendChild(toolbox_left);


        //canvas
        let canvas = document.createElement('canvas');
        canvas.id = 'canvas';
        canvas.width='600';
        canvas.height='400';
        document.body.appendChild(canvas);



        //colors palette 

        let colors = document.createElement('div');
        colors.className='colors';
        //inside the colors section
        let icon_color = document.createElement('div');
        icon_color.className='icons';
        let img_color = document.createElement('img');
        img_color.src = '../img/palette.png';
        icon_color.appendChild(img_color);
        colors.appendChild(icon_color);

        //create the colors elements
        let ul_colors = document.createElement('ul');
        let colors_list = ["rgba(0,0,0,255)","rgba(255,0,0,255)","rgba(0,128,0,255)","rgba(0,0,255,255)","rgba(255,255,0,255)","rgba(132,0,255,255)",
                    "rgba(63,119,116,255)","rgba(255,166,0,255)"];
        for(let i=0;i<colors_list.length;i++){
            let li_colors = document.createElement('li');
            let li_elements = document.createElement('div');
            li_elements.className='color';
            li_elements.title = colors_list[i];
            li_elements.style.backgroundColor = colors_list[i];
            li_colors.appendChild(li_elements);
            ul_colors.appendChild(li_colors);
        }
        colors.appendChild(ul_colors);
        document.body.appendChild(colors);

        let input = document.createElement('input');
        input.type = 'file';
        input.id ='files';
        input.multiple;
        input.style.display='none';

        document.body.appendChild(input);
    }
}