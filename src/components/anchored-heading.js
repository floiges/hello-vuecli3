import Vue from 'vue';

var getChildrenTextContent = function(children) {
    return children.map(function(node) {
        return node.children 
            ? getChildrenTextContent(node.children) 
            : node.text;
    }).join('');
};

Vue.component('anchored-heading', {
    render(h) {
        // 创建 kebab-case 风格的 ID
        var headingID = getChildrenTextContent(this.$slots.default)
            .toLowerCase()
            .replace(/\W+/g, '-')
            .replace(/(^-|-$)/g, '');
        console.log('headingID = ', headingID);

        return h(
            'h' + this.level,
            [
                h('a', {
                    attrs: {
                        name: headingID,
                        href: '#' + headingID
                    }
                }, this.$slots.default)
            ]
        );
    },
    props: {
        level: {
            type: Number,
            required: true
        }
    }
});