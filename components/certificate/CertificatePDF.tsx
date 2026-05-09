import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

// Color palette from CSS variables
const colors = {
  saffron: '#FF6B35',
  saffronDark: '#E85D25',
  saffronLight: '#FFE8DF',
  greenDark: '#1B4332',
  gold: '#C9952A',
  cream: '#FFFBF5',
  dark: '#1A0A00',
  grey: '#6B7280',
};

const styles = StyleSheet.create({
  page: {
    size: 'A4',
    orientation: 'landscape',
    backgroundColor: colors.cream,
    padding: 20,
  },
  outer: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  border: {
    border: '8pt solid ' + colors.greenDark,
    flex: 1,
    position: 'relative',
    minHeight: '597px',
    padding: '30pt 50pt',
  },
  borderInner: {
    position: 'absolute',
    top: 5,
    left: 5,
    right: 5,
    bottom: 5,
    border: '2pt solid ' + colors.gold,
    pointerEvents: 'none',
  },
  borderInnerDashed: {
    position: 'absolute',
    top: 9,
    left: 9,
    right: 9,
    bottom: 9,
    border: '1pt dashed ' + colors.gold,
    pointerEvents: 'none',
  },
  corner: {
    position: 'absolute',
    width: 40,
    height: 40,
    fontSize: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cornerTL: { top: 14, left: 14 },
  cornerTR: { top: 14, right: 14 },
  cornerBL: { bottom: 14, left: 14 },
  cornerBR: { bottom: 14, right: 14 },
  inner: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 10,
  },
  logoCircle: {
    width: 70,
    height: 70,
    backgroundColor: colors.greenDark,
    borderRadius: 35,
    border: '3pt solid ' + colors.gold,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 32,
    flexShrink: 0,
  },
  orgName: {
    alignItems: 'center',
  },
  orgHindi: {
    fontFamily: 'Yatra One',
    fontSize: 26,
    color: colors.greenDark,
    lineHeight: 1.1,
  },
  orgEnglish: {
    fontFamily: 'Cinzel',
    fontSize: 13,
    color: colors.saffronDark,
    letterSpacing: 3,
  },
  orgReg: {
    fontFamily: 'Helvetica',
    fontSize: 9,
    color: '#888888',
    letterSpacing: 1,
    marginTop: 4,
  },
  dividerOrnate: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1.5,
    backgroundColor: colors.gold,
  },
  om: {
    fontSize: 20,
    color: colors.gold,
    fontFamily: 'Times-Roman',
  },
  titleBadge: {
    backgroundColor: colors.greenDark,
    color: 'white',
    paddingHorizontal: 40,
    paddingVertical: 10,
    fontFamily: 'Cinzel',
    fontSize: 20,
    fontWeight: 700,
    letterSpacing: 6,
    textTransform: 'uppercase',
    marginBottom: 16,
    position: 'relative',
  },
  titleBadgeDecoration: {
    position: 'absolute',
    top: '50%',
    color: colors.gold,
    fontSize: 14,
    fontFamily: 'Times-Roman',
  },
  titleBadgeBefore: { left: 15 },
  titleBadgeAfter: { right: 15 },
  presented: {
    fontFamily: 'Playfair Display',
    fontSize: 13,
    color: '#666666',
    fontStyle: 'italic',
    marginBottom: 6,
  },
  name: {
    fontFamily: 'Playfair Display',
    fontSize: 34,
    fontWeight: 700,
    color: colors.saffronDark,
    borderBottom: `2pt solid ${colors.saffron}`,
    paddingBottom: 6,
    marginBottom: 6,
    minWidth: 300,
  },
  nameHindi: {
    fontFamily: 'Yatra One',
    fontSize: 18,
    color: colors.greenDark,
    marginBottom: 14,
  },
  bodyText: {
    fontFamily: 'Helvetica',
    fontSize: 13,
    lineHeight: 1.8,
    color: '#444444',
    maxWidth: 680,
    marginBottom: 10,
  },
  service: {
    backgroundColor: colors.saffronLight,
    border: `1pt solid ${colors.saffron}`,
    borderRadius: 4,
    padding: '6pt 20pt',
    fontFamily: 'Cinzel',
    fontSize: 12,
    fontWeight: 700,
    color: colors.saffronDark,
    letterSpacing: 2,
    marginBottom: 16,
  },
  footerGrid: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 'auto',
  },
  sigBlock: {
    textAlign: 'center',
  },
  sigLine: {
    borderBottom: `2pt solid ${colors.greenDark}`,
    width: 150,
    marginBottom: 6,
    height: 40,
  },
  sigName: {
    fontFamily: 'Cinzel',
    fontSize: 11,
    fontWeight: 700,
    color: colors.greenDark,
  },
  sigDesignation: {
    fontFamily: 'Helvetica',
    fontSize: 9,
    color: '#888888',
  },
  sealArea: {
    width: 80,
    height: 80,
    border: '2pt dashed ' + colors.gold,
    borderRadius: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 11,
    color: colors.gold,
    textAlign: 'center',
    lineHeight: 1.3,
  },
  footerBar: {
    backgroundColor: colors.greenDark,
    padding: '8pt 40pt',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontFamily: 'Helvetica',
    fontSize: 9,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 20,
  },
  certNoField: {
    borderBottom: '1pt dashed #999999',
    color: '#888888',
    fontFamily: 'Helvetica',
    fontSize: 11,
    minWidth: 180,
    textAlign: 'left',
    paddingBottom: 2,
    marginTop: 4,
  },
});

interface CertificatePDFProps {
  recipientName: string;
  recipientNameHindi: string;
  certificateType: string;
  eventName?: string;
  date: string;
  volunteerHours?: string;
}

export function CertificatePDF({
  recipientName,
  recipientNameHindi,
  certificateType,
  eventName,
  date,
  volunteerHours,
}: CertificatePDFProps) {
  const getCertificateTitle = () => {
    switch (certificateType) {
      case 'appreciation':
        return 'CERTIFICATE OF APPRECIATION';
      case 'participation':
        return 'CERTIFICATE OF PARTICIPATION';
      case 'completion':
        return 'CERTIFICATE OF COMPLETION';
      case 'service':
        return 'CERTIFICATE OF SERVICE';
      default:
        return 'CERTIFICATE OF APPRECIATION';
    }
  };

  const getHindiTitle = () => {
    switch (certificateType) {
      case 'appreciation':
        return 'प्रशंसा प्रमाण पत्र';
      case 'participation':
        return 'भागीदारी प्रमाण पत्र';
      case 'completion':
        return 'पूर्णता प्रमाण पत्र';
      case 'service':
        return 'सेवा प्रमाण पत्र';
      default:
        return 'प्रशंसा प्रमाण पत्र';
    }
  };

  const getBodyText = () => {
    const hoursText = volunteerHours ? `${volunteerHours} hours of ` : '';
    if (eventName) {
      return `This certificate is proudly presented to ${recipientName} for ${hoursText}active participation and valuable contribution in ${eventName}. Your dedication and service have made a significant impact on our mission.`;
    }
    return `This certificate is proudly presented to ${recipientName} for ${hoursText}outstanding service and dedication to Sewarth Path Sansthanam. Your commitment to our mission has made a meaningful difference in the community.`;
  };

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.outer}>
          <View style={styles.border}>
            <View style={styles.borderInner} />
            <View style={styles.borderInnerDashed} />

            {/* Lotus corner symbols */}
            <Text style={[styles.corner, styles.cornerTL]}>🪷</Text>
            <Text style={[styles.corner, styles.cornerTR]}>🪷</Text>
            <Text style={[styles.corner, styles.cornerBL]}>🪷</Text>
            <Text style={[styles.corner, styles.cornerBR]}>🪷</Text>

            <View style={styles.inner}>
              <View style={styles.header}>
                <View style={styles.logoCircle}>
                  <Image src="logo" style={{ width: 50, height: 50 }} />
                </View>
                <View style={styles.orgName}>
                  <Text style={styles.orgHindi}>सेवार्थ पथ संस्थानम्</Text>
                  <Text style={styles.orgEnglish}>SEVARTH PATH SANSTHANAM</Text>
                  <Text style={styles.orgReg}>Reg. No.: SPS/2025/0042</Text>
                </View>
              </View>

              <View style={styles.dividerOrnate}>
                <View style={styles.dividerLine} />
                <Text style={styles.om}>ॐ</Text>
                <View style={styles.dividerLine} />
              </View>

              <View style={styles.titleBadge}>
                <Text style={[styles.titleBadgeDecoration, styles.titleBadgeBefore]}>✦</Text>
                <Text>{getCertificateTitle()}</Text>
                <Text style={[styles.titleBadgeDecoration, styles.titleBadgeAfter]}>✦</Text>
              </View>

              <Text style={[styles.titleBadge, { marginBottom: 30, fontSize: 16 }]}>
                {getHindiTitle()}
              </Text>

              <Text style={styles.presented}>This certificate is proudly presented to</Text>

              <Text style={styles.name}>{recipientName}</Text>
              <Text style={styles.nameHindi}>{recipientNameHindi}</Text>

              <Text style={styles.bodyText}>{getBodyText()}</Text>

              <Text style={styles.service}>
                {certificateType.toUpperCase()} CERTIFICATE
              </Text>

              <View style={styles.footerGrid}>
                <View style={styles.sigBlock}>
                  <View style={styles.sigLine} />
                  <Text style={styles.sigName}>Shri Mahesh Kumar Pandey</Text>
                  <Text style={styles.sigDesignation}>Founder & President</Text>
                </View>

                <View style={styles.sealArea}>
                  <Text>SANSKRIT MOTTO<br/>सेवार्थ PATH<br/>॥ श्री ॥</Text>
                </View>

                <View style={styles.sigBlock}>
                  <View style={styles.sigLine} />
                  <Text style={styles.sigName}>Authorized Signatory</Text>
                  <Text style={styles.sigDesignation}>Secretary</Text>
                </View>
              </View>

              <View style={styles.footerBar}>
                <Text>Date: {date}</Text>
                <Text>॥ श्री ॥</Text>
                <Text>Certificate ID: _______________</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
