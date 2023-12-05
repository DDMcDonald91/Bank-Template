import ExamplesNavbar from 'components/Navbars/ExamplesNavbar';
import React from 'react';
import { Container } from 'reactstrap';
import LayoutHeader from '../../../components/Headers/LayoutHeader';
import '../../../assets/css/custom.css'

export default function About() {
  return (
    <div>
      <ExamplesNavbar />
      <LayoutHeader title="About Us" image='header.jpg' />
      <Container className='layout-page-content'>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tristique et egestas quis ipsum suspendisse ultrices gravida. Nascetur ridiculus mus mauris vitae. Egestas maecenas pharetra convallis posuere morbi leo urna molestie. Ut porttitor leo a diam. Semper feugiat nibh sed pulvinar proin. Dolor sit amet consectetur adipiscing elit pellentesque habitant. Eget mauris pharetra et ultrices neque ornare aenean. Consectetur lorem donec massa sapien faucibus et molestie ac. Scelerisque eu ultrices vitae auctor eu augue ut lectus arcu. Sed sed risus pretium quam vulputate dignissim suspendisse. Odio tempor orci dapibus ultrices in iaculis nunc sed augue. Vel quam elementum pulvinar etiam. Cursus mattis molestie a iaculis at. Augue neque gravida in fermentum et sollicitudin ac. Pretium nibh ipsum consequat nisl vel pretium. Sagittis nisl rhoncus mattis rhoncus urna neque viverra.
          <br />
          <br />
          Convallis posuere morbi leo urna molestie at elementum eu. Luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor. Tincidunt arcu non sodales neque. Porttitor rhoncus dolor purus non enim praesent elementum facilisis. Dolor magna eget est lorem. Tristique senectus et netus et. Faucibus interdum posuere lorem ipsum dolor sit amet consectetur adipiscing. Nulla pharetra diam sit amet nisl suscipit. Nunc eget lorem dolor sed viverra ipsum nunc aliquet. Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit. Ut ornare lectus sit amet est placerat. Ligula ullamcorper malesuada proin libero nunc consequat interdum varius. Et leo duis ut diam quam nulla. Vitae justo eget magna fermentum. Morbi tincidunt ornare massa eget egestas purus viverra. Amet venenatis urna cursus eget nunc scelerisque viverra mauris in. Suspendisse in est ante in nibh mauris cursus mattis molestie. Nisi vitae suscipit tellus mauris a diam maecenas sed.
          <br />
          <br />
          Eget lorem dolor sed viverra ipsum nunc aliquet bibendum. Hendrerit gravida rutrum quisque non tellus orci. Sit amet nisl purus in mollis nunc. Elit duis tristique sollicitudin nibh. Ut lectus arcu bibendum at varius vel pharetra vel. Fermentum et sollicitudin ac orci. Vel elit scelerisque mauris pellentesque. Morbi tincidunt augue interdum velit euismod. Sed sed risus pretium quam. Tristique senectus et netus et malesuada. Felis bibendum ut tristique et egestas. Ac auctor augue mauris augue neque gravida in fermentum. Massa vitae tortor condimentum lacinia quis vel eros. Et netus et malesuada fames ac turpis egestas. Vitae semper quis lectus nulla at volutpat diam. Tellus molestie nunc non blandit.
        </p>
      </Container>
    </div>
  );
}
