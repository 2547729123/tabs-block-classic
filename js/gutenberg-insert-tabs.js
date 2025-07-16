( function( wp ) {
  // 解构 WP 提供的相关函数和组件
  const { registerPlugin } = wp.plugins;
  const { PluginSidebarMoreMenuItem } = wp.editPost;
  const { useState } = wp.element;
  const { TextControl, Button, Modal } = wp.components;
  const { withDispatch } = wp.data;
  const { compose } = wp.compose;
  const { __ } = wp.i18n;

  // 插件的核心组件
  const InsertTabsButton = ( props ) => {
    const [ isOpen, setOpen ] = useState( false ); // 控制模态框显示隐藏
    const [ tabCount, setTabCount ] = useState( '4' ); // 标签数量输入框默认4

    // 生成并插入短代码
    const insertTabsShortcode = () => {
      let count = parseInt( tabCount, 10 );
      if ( isNaN( count ) || count < 1 || count > 20 ) {
        count = 4; // 安全默认值，限制1-20
      }

      // 拼接短代码文本
      let shortcode = '[my_tabs]\n';
      for ( let i = 1; i <= count; i++ ) {
        shortcode += `[my_tab title="标签${i}"]这里是标签${i}的内容[/my_tab]\n`;
      }
      shortcode += '[/my_tabs]\n';

      // 调用传入的插入内容函数
      props.insertContent( shortcode );
      setOpen( false ); // 关闭模态框
    };

    return (
      <>
        {/* 在更多菜单里添加按钮 */}
        <PluginSidebarMoreMenuItem
          icon="editor-code"
          onClick={ () => setOpen( true ) }
        >
          { __( '插入Tabs短代码', 'tabs-block-classic' ) }
        </PluginSidebarMoreMenuItem>

        {/* 模态框：输入标签数量 */}
        { isOpen && (
          <Modal
            title={ __( '生成 Tabs 短代码', 'tabs-block-classic' ) }
            onRequestClose={ () => setOpen( false ) }
          >
            <TextControl
              label={ __( '标签数量', 'tabs-block-classic' ) }
              value={ tabCount }
              onChange={ ( val ) => setTabCount( val ) }
              type="number"
              min="1"
              max="20"
            />
            <Button
              isPrimary
              onClick={ insertTabsShortcode }
              style={ { marginTop: '15px' } }
            >
              { __( '插入短代码', 'tabs-block-classic' ) }
            </Button>
          </Modal>
        ) }
      </>
    );
  };

  // 利用 withDispatch 把插入短代码的操作注入组件 props
  const InsertTabsButtonWithDispatch = compose( [
    withDispatch( ( dispatch ) => ( {
      insertContent: ( content ) =>
        dispatch( 'core/editor' ).insertBlocks(
          wp.blocks.createBlock( 'core/shortcode', { text: content } )
        ),
    } ) ),
  ] )( InsertTabsButton );

  // 注册插件，使按钮出现在编辑器的更多菜单
  registerPlugin( 'insert-tabs-shortcode-plugin', {
    render: InsertTabsButtonWithDispatch,
    icon: 'editor-code',
  } );
} )( window.wp );
