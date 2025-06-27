const { registerPlugin } = wp.plugins;
const { PluginSidebarMoreMenuItem } = wp.editPost;
const { useState } = wp.element;
const { TextControl, Button, Modal } = wp.components;
const { withDispatch } = wp.data;
const { compose } = wp.compose;

const InsertTabsButton = ( props ) => {
    const [ isOpen, setOpen ] = useState(false);
    const [ tabCount, setTabCount ] = useState('4');

    const insertTabsShortcode = () => {
        let count = parseInt(tabCount) || 4;
        let shortcode = '[my_tabs]\\n';
        for(let i=1; i<=count; i++){
            shortcode += '[my_tab title="标签'+i+'"]这里是标签'+i+'的内容[/my_tab]\\n';
        }
        shortcode += '[/my_tabs]\\n';
        props.insertContent(shortcode);
        setOpen(false);
    };

    return <>
        <PluginSidebarMoreMenuItem
            icon="editor-code"
            onClick={() => setOpen(true)}
        >
            插入Tabs短代码
        </PluginSidebarMoreMenuItem>

        { isOpen && <Modal
            title="生成 Tabs 短代码"
            onRequestClose={() => setOpen(false)}
        >
            <TextControl
                label="标签数量"
                value={ tabCount }
                onChange={ (val) => setTabCount(val) }
                type="number"
                min="1"
            />
            <Button
                isPrimary
                onClick={ insertTabsShortcode }
                style={ { marginTop: '15px' } }
            >
                插入短代码
            </Button>
        </Modal> }
    </>;
};

const InsertTabsButtonWithDispatch = compose([
    withDispatch( dispatch => ({
        insertContent: (content) => dispatch('core/editor').insertBlocks(
            wp.blocks.createBlock('core/shortcode', { text: content })
        )
    })),
])(InsertTabsButton);

registerPlugin('insert-tabs-shortcode-plugin', {
    render: InsertTabsButtonWithDispatch,
    icon: 'editor-code',
});
