import React, { useCallback } from 'react';
import { Dimensions, Easing, StyleSheet, View } from 'react-native';
import { Firework, Fireworks } from 'react-native-fiesta';
import {
  Canvas,
  Fill,
  Shader,
  Skia,
  useClockValue,
  useComputedValue,
  useTiming,
  vec,
} from '@shopify/react-native-skia';
import { RouteProp, useRoute } from '@react-navigation/native';
import type { RootStackParamList } from '../App';

type FiestaExampleScreenNavigationProp = RouteProp<
  RootStackParamList,
  'FiestaExample'
>;

const initialPosition = {
  x: Dimensions.get('window').width / 2,
  y: Dimensions.get('window').width / 2,
};

const source = Skia.RuntimeEffect.Make(`
uniform float  iTime;
vec3 iResolution = vec3(512, 512, 1.0);
vec3 iMouse = vec3(512, 512, 1.0);

// Star Nest by Pablo Roman Andrioli

// This content is under the MIT License.

const int iterations = 17;
const float formuparam = 0.53;

const int volsteps = 20;
const float stepsize = 0.1;

const float zoom  = 0.800;
const float tile  = 0.850;
const float speed =0.010 ;

const float brightness =0.0015;
const float darkmatter =0.300;
const float distfading =0.730;
const float saturation =0.850;


half4 main( in vec2 fragCoord )
{
	//get coords and direction
	vec2 uv=fragCoord.xy/iResolution.xy-.5;
	uv.y*=iResolution.y/iResolution.x;
	vec3 dir=vec3(uv*zoom,1.);
	float time=iTime*speed+.25;

	//mouse rotation
	float a1=.5+iMouse.x/iResolution.x*2.;
	float a2=.8+iMouse.y/iResolution.y*2.;
	mat2 rot1=mat2(cos(a1),sin(a1),-sin(a1),cos(a1));
	mat2 rot2=mat2(cos(a2),sin(a2),-sin(a2),cos(a2));
	dir.xz*=rot1;
	dir.xy*=rot2;
	vec3 from=vec3(1.,.5,0.5);
	from+=vec3(time*2.,time,-2.);
	from.xz*=rot1;
	from.xy*=rot2;
	
	//volumetric rendering
	float s=0.1,fade=1.;
	vec3 v=vec3(0.);
	for (int r=0; r<volsteps; r++) {
		vec3 p=from+s*dir*.5;
		p = abs(vec3(tile)-mod(p,vec3(tile*2.))); // tiling fold
		float pa,a=pa=0.;
		for (int i=0; i<iterations; i++) { 
			p=abs(p)/dot(p,p)-formuparam; // the magic formula
			a+=abs(length(p)-pa); // absolute sum of average change
			pa=length(p);
		}
		float dm=max(0.,darkmatter-a*a*.001); //dark matter
		a*=a*a; // add contrast
		if (r>6) fade*=1.-dm; // dark matter, don't render near
		//v+=vec3(dm,dm*.5,0.);
		v+=fade;
		v+=vec3(s,s*s,s*s*s*s)*a*brightness*fade; // coloring based on distance
		fade*=distfading; // distance fading
		s+=stepsize;
	}
	v=mix(vec3(length(v)),v,saturation); //color adjust
	return vec4(v*.01,1.);	
	
}
`)!;

export function FiestaExample() {
  const route = useRoute<FiestaExampleScreenNavigationProp>();

  const iTime = useTiming(
    {
      from: 0,
      to: 100,
    },
    {
      duration: 30000,
      easing: Easing.linear,
    }
  );

  const uniforms = useComputedValue(
    () => ({
      iTime: iTime.current,
    }),
    [iTime]
  );

  return (
    <Canvas style={styles.canvas}>
      <Fill>
        <Shader source={source} uniforms={uniforms} />
      </Fill>
    </Canvas>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181D31',
  },
  canvas: {
    flex: 1,
  },
});
