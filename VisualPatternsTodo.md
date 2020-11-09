# PatternNetwork

- change icon: https://antv-graphin.gitee.io/en/docs/manual/advanced-guides/extend#extend-icon
		shape
		==> https://graphin.antv.vision/zh/examples/shape/node#CustomNode
- separate dges https://graphin.antv.vision/zh/examples/shape/edge

- raggruppamento dei nodi https://graphin.antv.vision/zh/examples/advanced/node-combo#Simple

- leggenda (classi e colori : https://graphin.antv.vision/zh/examples/components/legend )

- proliferazioni dei nodi: se voglio far apparire nodi collegati rendering incrementale https://graphin.antv.vision/zh/docs/manual/getting-started#02-%E8%8A%82%E7%82%B9%E6%89%A9%E6%95%A3
- aggiunta nodi https://graphin.antv.vision/zh/examples/render/expand

==================
multiple selection

# node click event trigger an action
# node-click.ts
https://github.com/antvis/Graphin/blob/30ad83eee82ea7a51d2cdf8f271d95c50e3a06cd/packages/graphin-studio/src/Events/node-click.ts
# reducer handle this even
'graph/node-click'
  return updateChain(state)
hselttps://github.com/antvis/Graphin/blob/30ad83eee82ea7a51d2cdf8f271d95c50e3a06cd/packages/graphin-studio/src/Redux/reducer.ts
state grapheneState

==================

# TimeIndexedTypedLocationResource

-   add arrowhead to vectors ( make polyline without arrowhead, tightening on the tip )

    https://stackoverflow.com/questions/36720680/path-with-ascending-stroke-width

-   add style as a props

# CollectionEntity

-   only first item with open depiction
-   stimulate mouseover ( UX )
-   set collection label position ( UX )
-   rdf icon to represents item ( or another symbol )
-   thinner border
-   element label in popup with depiction

-   put property hasCollection, hasTimeIndexedTypedLocation in Ontology reactor such other ld-r properties

https://kar.kent.ac.uk/39007/1/STAR_paper.pdf
http://ontologydesignpatterns.org/wiki/images/d/d2/WOP2019-slides-pattern1.pdf
http://ceur-ws.org/Vol-2459/pattern1.pdf

# other

sequenza (list)
classification (color | border to discriminate )
