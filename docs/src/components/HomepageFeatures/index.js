import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Out of the box',
    Svg: require('@site/static/img/balloons.svg').default,
    description: (
      <>
        Import it, place it and celebrate. There is no need to think about
        complex logic to celebrate a special occassion with your users.
      </>
    ),
  },
  {
    title: 'Customise it',
    Svg: require('@site/static/img/firework.svg').default,
    description: (
      <>
        Whether you want to celebrate the first order or the user's birthday, it
        offers you flexibility to add themes to the animations.
      </>
    ),
  },
  {
    title: 'Powered by React Native Skia',
    Svg: require('@site/static/img/logo.svg').default,
    description: (
      <>
        It uses React Native Skia which is a high performance 2D graphics
        library for React Native. We just put some stuff together for you.
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
