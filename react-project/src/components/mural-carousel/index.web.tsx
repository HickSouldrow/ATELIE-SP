import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';

import { Colors } from '@/constants/colors';

import { styles } from './styles.web';
import { MuralCarouselProps } from './types';

const NEON_BORDERS = [Colors.neon.pink, Colors.neon.cyan, Colors.neon.yellow];

const MURALS = [
    { source: require('../../../assets/murais/mural-01.png'), caption: 'Fachada no centro' },
    { source: require('../../../assets/murais/mural-02.png'), caption: 'Personagens no muro azul' },
    { source: require('../../../assets/murais/mural-03.png'), caption: 'Beco de paralelepípedos' },
    { source: require('../../../assets/murais/mural-04.png'), caption: 'Traço em preto e branco' },
    { source: require('../../../assets/murais/mural-05.png'), caption: 'Sob o viaduto' },
    { source: require('../../../assets/murais/mural-06.png'), caption: 'Céu de grafite' },
];

const CARD_WIDTH = 216;

const MuralCarouselWeb: React.FC<MuralCarouselProps> = ({ title = 'Do asfalto pra tela', style, ...rest }) => {
    return (
        <View style={[styles.wrapper, style]} {...rest}>
            <Text style={styles.heading}>{title}</Text>
            <Text style={styles.subheading}>Um pedaço dos murais que inspiram o AteliêSP</Text>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={CARD_WIDTH + 14}
                decelerationRate="fast"
                contentContainerStyle={styles.track}>
                {MURALS.map((mural, index) => {
                    const borderColor = NEON_BORDERS[index % NEON_BORDERS.length];

                    return (
                        <View key={mural.caption} style={[styles.card, { borderColor }]}>
                            <Image source={mural.source} style={styles.image} resizeMode="cover" />
                            <LinearGradient
                                colors={['transparent', 'rgba(8,3,4,0.88)']}
                                style={styles.captionScrim}>
                                <Text style={styles.caption}>{mural.caption}</Text>
                            </LinearGradient>
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
};

export { MuralCarouselWeb as MuralCarousel };
export default MuralCarouselWeb;
