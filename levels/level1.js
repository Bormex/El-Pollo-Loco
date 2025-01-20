const Level1 = new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Endboss()
    ],
    [
        new Cloud('img/5_background/layers/4_clouds/2.png', 500, 250, 0 ),
        new Cloud('img/5_background/layers/4_clouds/2.png', 250, 125, 500 ),
        new Cloud('img/5_background/layers/4_clouds/1.png', 500, 250, 719 ),
        new Cloud('img/5_background/layers/4_clouds/2.png', 250, 125, 1200 ),
        new Cloud('img/5_background/layers/4_clouds/2.png', 500, 250, 719*2 ),
        new Cloud('img/5_background/layers/4_clouds/2.png', 250, 125, 1925 ),
        new Cloud('img/5_background/layers/4_clouds/1.png', 500, 250, 719*3 ),
        new Cloud('img/5_background/layers/4_clouds/2.png', 250, 125, 2625 ),
        new Cloud('img/5_background/layers/4_clouds/2.png', 500, 250, 719*4 ),
        new Cloud('img/5_background/layers/4_clouds/1.png', 500, 250, 719*5, )
    ],
    [
        // statt so oft, geht auch mit einer for-schleife!!
        new Background('img/5_background/layers/air.png', -719),
        new Background('img/5_background/layers/3_third_layer/2.png', -719),
        new Background('img/5_background/layers/2_second_layer/2.png', -719),
        new Background('img/5_background/layers/1_first_layer/2.png', -719),

        new Background('img/5_background/layers/air.png', 0),
        new Background('img/5_background/layers/3_third_layer/1.png', 0),
        new Background('img/5_background/layers/2_second_layer/1.png', 0),
        new Background('img/5_background/layers/1_first_layer/1.png', 0),

        new Background('img/5_background/layers/air.png', 719),
        new Background('img/5_background/layers/3_third_layer/2.png', 719),
        new Background('img/5_background/layers/2_second_layer/2.png', 719),
        new Background('img/5_background/layers/1_first_layer/2.png', 719),

        new Background('img/5_background/layers/air.png', 719*2),
        new Background('img/5_background/layers/3_third_layer/1.png', 719*2),
        new Background('img/5_background/layers/2_second_layer/1.png', 719*2),
        new Background('img/5_background/layers/1_first_layer/1.png', 719*2),

        new Background('img/5_background/layers/air.png', 719*3),
        new Background('img/5_background/layers/3_third_layer/2.png', 719*3),
        new Background('img/5_background/layers/2_second_layer/2.png', 719*3),
        new Background('img/5_background/layers/1_first_layer/2.png', 719*3),
        
        new Background('img/5_background/layers/air.png', 719*4),
        new Background('img/5_background/layers/3_third_layer/2.png', 719*4),
        new Background('img/5_background/layers/2_second_layer/2.png', 719*4),
        new Background('img/5_background/layers/1_first_layer/2.png', 719*4),
        
        new Background('img/5_background/layers/air.png', 719*4),
        new Background('img/5_background/layers/3_third_layer/1.png', 719*4),
        new Background('img/5_background/layers/2_second_layer/1.png', 719*4),
        new Background('img/5_background/layers/1_first_layer/1.png', 719*4),
    ]
)
