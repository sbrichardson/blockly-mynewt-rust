/// Code Generator Functions for App Blocks

Blockly.Rust['app'] = function(block) {
  //  Generate App Widget with ui_builder() function
  Blockly.Rust.widgets_ = {};
  var elements = new Array(block.itemCount_);
  for (var i = 0; i < block.itemCount_; i++) {
    elements[i] = Blockly.Rust.valueToCode(block, 'ADD' + i,
            Blockly.Rust.ORDER_NONE) || '\'\'';
  }

  //  Create the Widgets e.g. let my_button = Button::new("increment", on_my_button_press); 
  var widgets = Object.values(Blockly.Rust.widgets_).join('\n');

  //  Add the Widgets
  var code = [
    '/// Build the UI for the window',
    'fn ui_builder() -> impl Widget<State> {  //  `State` is the Application State',  //  TODO: Fix <State>
    Blockly.Rust.prefixLines([
        'console::print("Rust UI builder\\n"); console::flush();',
        widgets,
        '',
        '//  Create a column',
        'let mut col = Column::new();',
        //  Insert the elements.
        elements.join('\n'),
        '//  Return the column containing the widgets',
        'col',  
      ].join('\n'), 
      Blockly.Rust.INDENT),
    '}',  //  TODO: Remove trailing semicolon
  ].join('\n');
  return [code, Blockly.Rust.ORDER_NONE];
};

Blockly.Rust['label'] = function(block) {
  //  Generate a Label Widget
  var text_name = block.getFieldValue('NAME');  //  e.g. my_label
  var value_name = Blockly.Rust.valueToCode(block, 'name', Blockly.JavaScript.ORDER_ATOMIC);

  //  Create the Widget
  Blockly.Rust.widgets_[text_name] = [
    '//  Create a line of text',
    'let ' + text_name + '_text = LocalizedString::new("hello-counter")',  //  TODO
    Blockly.Rust.INDENT + '.with_arg("count", on_' + text_name + '_show);  //  Call on_' + text_name + '_show to get label text',
    '//  Create a label widget to display the text',
    'let ' + text_name + ' = Label::new(' + text_name + '_text);',
  ].join('\n');

  //  Add the Widget
  var code = [
    '//  Add the label widget to the column, centered with padding',
    'col.add_child(',
    Blockly.Rust.INDENT + 'Align::centered(',
    Blockly.Rust.INDENT + Blockly.Rust.INDENT + 'Padding::new(5.0, ',  //  TODO
    Blockly.Rust.INDENT + Blockly.Rust.INDENT + Blockly.Rust.INDENT + text_name,
    Blockly.Rust.INDENT + Blockly.Rust.INDENT + ')',
    Blockly.Rust.INDENT + '),',
    Blockly.Rust.INDENT + '1.0',
    ');',
  ].join('\n');

  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Rust.ORDER_NONE];
};

Blockly.Rust['button'] = function(block) {
  //  Generate a Button Widget
  var text_name = block.getFieldValue('NAME');  //  e.g. my_button
  var value_name = Blockly.Rust.valueToCode(block, 'name', Blockly.JavaScript.ORDER_ATOMIC);

  //  Create the Widget
  Blockly.Rust.widgets_[text_name] = [
    '//  Create a button widget labelled "increment"',  //  TODO
    'let ' + text_name + ' = Button::new("increment", on_' + text_name + '_press);  //  Call on_' + text_name + '_press when pressed',  //  TODO
  ].join('\n');

  //  Add the Widget
  var code = [
    '//  Add the button widget to the column, with padding',
    'col.add_child(',
    Blockly.Rust.INDENT + 'Padding::new(5.0, ',  //  TODO
    Blockly.Rust.INDENT + Blockly.Rust.INDENT + text_name,
    Blockly.Rust.INDENT + '),',
    Blockly.Rust.INDENT + '1.0',
    ');',
  ].join('\n');
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Rust.ORDER_NONE];
};