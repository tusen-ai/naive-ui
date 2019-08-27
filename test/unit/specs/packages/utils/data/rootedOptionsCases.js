export default [
  {
    input: [ [
      {
        label: 'China',
        value: 'china',
        children: [
          {
            label: 'Bejing',
            value: 'beijing',
            children: [
              {
                label: 'Haidian',
                value: 'haidian'
              },
              {
                label: 'Chaoyang',
                value: 'chaoyang'
              }
            ]
          }
        ]
      },
      {
        label: 'USA',
        value: 'usa',
        children: [
          {
            label: 'California',
            value: 'california',
            children: [
              {
                label: 'Los Angeles',
                value: 'los angeles'
              }
            ]
          }
        ]
      }
    ]],
    output: [
      {
        'value': null,
        'label': null,
        'children': [
          {
            'label': 'China',
            'value': 'china',
            'children': [
              {
                'label': 'Bejing',
                'value': 'beijing',
                'children': [
                  {
                    'label': 'Haidian',
                    'value': 'haidian'
                  },
                  {
                    'label': 'Chaoyang',
                    'value': 'chaoyang'
                  }
                ]
              }
            ]
          },
          {
            'label': 'USA',
            'value': 'usa',
            'children': [
              {
                'label': 'California',
                'value': 'california',
                'children': [
                  {
                    'label': 'Los Angeles',
                    'value': 'los angeles'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
]
