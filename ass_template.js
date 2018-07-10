module.exports.ScriptInfo = {
	section: 'Script Info',
	body: [
		{
			type: 'comment',
			value: ' This is a Sub Station Alpha v4 script.'
		},
		{
			type: 'comment',
			value: ' For Sub Station Alpha info and downloads,'
		},
		{
			type: 'comment',
			value: ' go to http://www.eswat.demon.co.uk/'
		},
		{
			key: 'Title',
			value: ''
		},
		{
			key: 'ScriptType',
			value: 'v4.00'
		},
		{
			key: 'PlayResY',
			value: 0
		},
		{
			key: 'PlayResX',
			value: 0
		}		
	]
}

module.exports.Styles = {
	section: 'V4 Styles',
	body: [
		{
			key: 'Format',
			value: [
				'Name',
				'Fontname',
				'Fontsize',
				'PrimaryColour',
				'SecondaryColour',
				'TertiaryColour',
				'BackColour',
				'Bold',
				'Italic',
				'BorderStyle',
				'Outline',
				'Shadow',
				'Alignment',
				'MarginL',
				'MarginR',
				'MarginV',
				'AlphaLevel',
				'Encoding'
			]
		},
		{
			key: 'Style',
			value: {
				'Name': 'Default',
				'Fontname': 'Arial',
				'Fontsize': '33',
				'PrimaryColour': '&H00FFFFFF',
				'SecondaryColour': '&H000088EF',
				'OutlineColour': '&H00000000',
				'BackColour': '&H00666666',
				'Bold': '-1',
				'Italic': '0',
				'Underline': '0',
				'StrikeOut': '0',
				'BorderStyle': '1',
				'ScaleX': '100',
				'ScaleY': '100',
				'Spacing': '0',
				'Angle': '0',
				'Outline': '1',
				'Shadow': '5',
				'Alignment': '8',
				'MarginL': '18',
				'MarginR': '18',
				'MarginV': '17',
				'Encoding': '1'
			}
		}
	]
}

module.exports.Events = {
	section: 'Events',
    body: [
        {
        	key: 'Format',
            'value': [
				'Layer',
                'Start',
                'End',
                'Style',
                'Name',
                'MarginL',
                'MarginR',
                'MarginV',
                'Effect',
                'Text'
            ]
        }        
    ]
}

module.exports.Dialogue = {
	'key': 'Dialogue',
	'value': {
		'Layer': '0',
		'Start': '0:00:00.00',
		'End': '0:00:00.00',
		'Style': 'Default',
		'Name': '',
		'MarginL': '0',
		'MarginR': '0',
		'MarginV': '0',
		'Effect': 'karaoke',
		'Text': ''
		}
}
