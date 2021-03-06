const Alarm = new Map([
  ['AHU4-3-1-ALM_CV', 3704], // ahu1
  ['AHU4-3-2-ALM_CV', 3702], // ahu2
  ['AHU4-1-2-ALM_CV', 5670], // ahu1
  ['AHU4-2-1-ALM_CV', 4024], // ahu1
  ['AHU4-2-2-ALM_CV', 4033], // ahu2
  ['AHU4-4-1-ALM_CV', 3254], // ahu1
  ['AHU4-4-2-ALM_CV', 3252], // ahu2
  ['AHU4-8-1-ALM_CV', 3254], // ahu1
  ['AHU4-8-2-ALM_CV', 3252], // ahu2
  ['AHU4-5-1-ALM_CV', 3252], // ahu1
  ['AHU4-5-2-ALM_CV', 3250], // ahu2
  ['AHU4-6-1-ALM_CV', 3252], // ahu1
  ['AHU4-6-2-ALM_CV', 3250], // ahu2
  ['AHU4-7-1-ALM_CV', 3252], // ahu1
  ['AHU4-7-2-ALM_CV', 3250], // ahu2
  ['4号楼3F', 2812], // 枪式摄像头[4号楼3F] 655288
  ['4号楼1F', 8257], // 枪式摄像头[4号楼1F] 736146
  ['4号楼2F', 7072], // 枪式摄像头[4号楼2F] 634601
  ['4号楼4F', 5077], // 枪式摄像头[4号楼4F] 604414
  ['4号楼8F', 5077], // 枪式摄像头[4号楼8F] 604414
  ['4号楼5F', 5037], // 枪式摄像头[4号楼5F] 604722
  ['4号楼6F', 5037], // 枪式摄像头[4号楼6F] 604722
  ['4号楼7F', 5037], // 枪式摄像头[4号楼7F] 604722
  ['4号楼B1F', 18843], // 枪式摄像头[4号楼5F] 3083643
  ['4号楼B2F', 15000], // 枪式摄像头[4号楼5F] 3063709
  ['4号楼B3F', 9915], // 枪式摄像头[4号楼5F] 3045892
  ['4号楼B4F', 11389], // 枪式摄像头[4号楼F] 3051611
  ['HP4#-1-ALM_CV', 18671],
  ['HP4#-2-ALM_CV', 18672],
  ['HP4#-3-ALM_CV', 18673],
  ['CP4#-1-ALM_CV', 18674],
  ['CP4#-2-ALM_CV', 18675],
  ['CP4#-3-ALM_CV', 18676]
])
export default {
  Alarm
}

// const Alarm = new Map([
//   ['00a44151', 2754], // B4F3
//   ['00a4507c', 2755],
//   ['00a4188e', 2756],
//   ['00a41d63', 2757],
//   ['00a44170', 2758],
//   ['00a44164', 2759],
//   ['00a41813', 2760],
//   ['00a56374', 2761],
//   ['00a40c70', 2762],
//   ['00a5638a', 2763],
//   ['00a40c8e', 2764],
//   ['009c9464', 2765],
//   ['009c9a14', 2766],
//   ['00a453f7', 2767],
//   ['00a32325', 2768],
//   ['00a40c6c', 2769],
//   ['00a443e0', 2770],
//   ['00a40c8b', 2771],
//   ['00a45412', 2772],
//   ['00a443e1', 2773],
//   ['00a44512', 2774],
//   ['00a445c6', 2775],
//   ['00a452e8', 2776],
//   ['00a40c6f', 2777],
//   ['00a444cb', 2778],
//   ['00a4232e', 2779],
//   ['00a445b4', 2780],
//   ['00a4232a', 2781],
//   ['00a452a3', 2782],
//   ['00a40c6e', 2783],
//   ['00a40c74', 2784],
//   ['00a445c3', 2785],
//   ['00a40c6d', 2786],
//   ['00a41889', 2787],
//   ['00a44178', 2788],
//   ['00a44167', 2789],
//   ['00a4536d', 2790],
//   ['00a45083', 2791],
//   ['00a56374', 2792],
//   ['00a40c8d', 2793],
//   ['00a32325', 2794],
//   ['00a4232d', 2795],
//   ['00a56374', 2796],
//   ['0096e5b0', 2799], // 温感
//   ['AHU4-3-1-ALM_CV', 3704], // ahu1
//   ['AHU4-3-2-ALM_CV', 3702], // ahu2
//   ['AHU4-1-2-ALM_CV', 5670], // ahu1
//   ['AHU4-2-1-ALM_CV', 4024], // ahu1
//   ['AHU4-2-2-ALM_CV', 4033], // ahu2
//   ['AHU4-4-1-ALM_CV', 3254], // ahu1
//   ['AHU4-4-2-ALM_CV', 3252], // ahu2
//   ['00babceb', 7748], // B4F1
//   ['00babcc5', 7749],
//   ['00bae103', 7747],
//   ['00bae117', 7751],
//   ['00babcc9', 7752],
//   ['00babcbd', 7753],
//   ['00b9e439', 7754],
//   ['00a44139', 7755],
//   ['00a53af7', 7756],
//   ['00a4503f', 7757],
//   ['00a4503f', 7758],
//   ['00a53af7', 7759],
//   ['00a43532', 7760],
//   ['00a44123', 7761],
//   ['00e983b9', 7762],
//   ['00a4411c', 7763],
//   ['00a44123', 7764],
//   ['00a4326c', 7765],
//   ['00bae129', 7766],
//   ['009cc8c1', 7767],
//   ['00a41807', 7768],
//   ['00a56555', 7769],
//   ['00babcca', 7770],
//   ['00a41c07', 7771],
//   ['00a45022', 7772],
//   ['00fc8f0f', 7773],
//   ['00fc4f48', 7774],
//   ['00e738b2', 7775],
//   ['00fc8f19', 7776],
//   ['00fc4f46', 7777],
//   ['00e8d491', 7778],
//   ['00fc4f63', 7779],
//   ['00fc8f1e', 7780],
//   ['00e663ea', 7781],
//   ['00fc8f1a', 7782],
//   ['00e663e5', 7783],
//   ['00fc4f64', 7784],
//   ['00a45040', 7785],
//   ['00e8d47f', 7786],
//   ['00babccb', 7787],
//   ['00a41807', 7788],
//   ['00a41bf1', 7789],
//   ['00b9e439', 7790],
//   ['00a56556', 7791],
//   ['00a4503f', 7792],
//   ['00a3a0be', 6287], // B4F2
//   ['00a3e2e3', 6288],
//   ['00a5392b', 6289],
//   ['00a3e2c3', 6290],
//   ['00a3e2c1', 6291],
//   ['00a3e201', 6292],
//   ['00a53913', 6293],
//   ['00a56394', 6294],
//   ['00a5385a', 6295],
//   ['00a53924', 6296],
//   ['00a53aae', 6296],
//   ['00a53939', 6297],
//   ['0233faca', 6298],
//   ['00a56398', 6299],
//   ['00a4ddca', 6300],
//   ['00a4501f', 6301],
//   ['00ba5cd6', 6302],
//   ['00a41bcd', 6303],
//   ['00a4412c', 6304],
//   ['00a44125', 6305],
//   ['00a4412c', 6306],
//   ['00a44125', 6307],
//   ['00a44131', 6308],
//   ['00a4413b', 6309],
//   ['00a56554', 6310],
//   ['00a56384', 6311],
//   ['00a3a0a8', 6312],
//   ['00a3a0bb', 6313],
//   ['00a3e305', 6314],
//   ['00a339bd', 6315],
//   ['00a3a0cb', 6316],
//   ['00a3c5f4', 6317],
//   ['00a3c619', 6318],
//   ['00a3c5f4', 6319],
//   ['00a3399c', 6320],
//   ['00a3a0f3', 6321],
//   ['00a3c619', 6322],
//   ['00a3a0f3', 6323],
//   ['00a3c649', 6324],
//   ['00a3c789', 6325],
//   ['00a3c618', 6326],
//   ['00a5653f', 6327],
//   ['00a53b58', 6328],
//   ['00a3c60a', 6329],
//   ['00a33986', 6330],
//   ['00a562b5', 6331],
//   ['00a33988', 6332],
//   ['00a339ae', 6333],
//   ['00a53ad4', 6334],
//   ['0093d102', 6337], // 温感
//   ['4号楼3F', 2812], // 枪式摄像头[4号楼3F] 655288
//   ['4号楼1F', 8257], // 枪式摄像头[4号楼1F] 736146
//   ['4号楼2F', 7072], // 枪式摄像头[4号楼2F] 634601
//   ['4号楼4F', 5077] // 枪式摄像头[4号楼2F] 604414
// ])
// export default {
//   Alarm
// }
